import { text, confirm, multiselect, select, spinner } from '@clack/prompts';
import { checkCancel, selectComponents } from '../utils/prompts';
import * as path from 'path';
import chalk from 'chalk';
import { FEATURES, FeatureDef, ComponentDef } from '../config/features';
import { getRootTemplatePath } from '../utils/paths';
import { TEMPLATES } from '../config/templates';
import { create } from './create';
import { isDirectoryEmpty, cloneTemplate } from '../actions/repository';
import { pruneMonorepo, pruneComponentLibrary } from '../actions/prune';
import { setProjectName } from '../actions/project';
import { installFeature } from '../actions/install';

export async function init() {
    console.log(chalk.bold.cyan('MD Starter - Initialize Monorepo'));

    // 1. PROJECT NAME
    const projectNamePrompt = await text({
        message: 'What is the name of your monorepo?',
        placeholder: 'my-monorepo',
        validate: (value) => {
            if (!value) return 'Name is required';
        }
    });
    checkCancel(projectNamePrompt);
    const projectName = projectNamePrompt as string;

    if (!projectName) return;

    const targetDir = path.resolve(process.cwd(), projectName);

    // 2. CHECK DIRECTORY
    const empty = await isDirectoryEmpty(targetDir);
    if (!empty) {
        console.error(chalk.red(`Directory ${projectName} is not empty. Please use a new directory.`));
        process.exit(1);
    }

    // 3. FEATURE SELECTION
    // 3. FEATURE SELECTION
    const featureSelection = await multiselect({
        message: 'Select features to include:',
        options: FEATURES.map(f => ({
            value: f.id,
            label: f.label,
            hint: f.category
        })),
        required: false // Allow minimal
    });
    checkCancel(featureSelection);
    const selectedFeatureIds = featureSelection as string[];

    // 4. SHARED COMPONENT SELECTION (if 'components' feature selected)
    let selectedComponents: ComponentDef[] = [];

    if (selectedFeatureIds.includes('components')) {
        const { COMPONENTS } = require('../config/features');
        const comps = COMPONENTS as ComponentDef[];

        const selectedIds = await selectComponents(comps);
        selectedComponents = comps.filter(c => selectedIds.includes(c.id));
    }

    // 5. APP CREATION PROMPT
    // 5. APP CREATION PROMPT
    const shouldAddAppPrompt = await confirm({
        message: 'Do you want to add your first application now?',
        initialValue: true
    });
    checkCancel(shouldAddAppPrompt);
    const shouldAddApp = shouldAddAppPrompt as boolean;

    let firstAppName = '';
    let firstAppTemplate = '';

    if (shouldAddApp) {
        const namePrompt = await text({
            message: 'Application Name:',
            placeholder: 'web-app',
            validate: (value) => !value ? 'Name required' : undefined
        });
        checkCancel(namePrompt);
        firstAppName = namePrompt as string;

        const templatePrompt = await select({
            message: 'Select Template:',
            options: Object.entries(TEMPLATES).map(([key, cfg]) => ({ value: key, label: cfg.label }))
        });
        checkCancel(templatePrompt);
        firstAppTemplate = templatePrompt as string;
    }

    // --- EXECUTION ---
    const s = spinner();
    s.start('Scaffolding monorepo...');

    try {
        const rootTemplate = getRootTemplatePath();

        // 1. Clone Root
        await cloneTemplate(rootTemplate, targetDir);

        // 2. Project Name
        await setProjectName(targetDir, projectName);

        // 3. Prune Root Features
        await pruneMonorepo(targetDir, selectedFeatureIds);

        // 4. Prune Component Library (if selected)
        if (selectedFeatureIds.includes('components')) {
            // We need to pass ALL components to prune logic to know what to remove
            const { COMPONENTS } = require('../config/features');
            const componentsDir = path.join(targetDir, 'packages/components'); // Assuming standard path
            await pruneComponentLibrary(componentsDir, selectedComponents, COMPONENTS);
        }

        s.stop('Monorepo scaffolded.');

        // 5. Create First App
        if (shouldAddApp && firstAppName && firstAppTemplate) {
            // We need to change CWD for create()? 
            // create() uses process.cwd() + 'apps/' + name. 
            // So if we are in root, create() creates in apps/. 
            // But we are currently in parent dir of monorepo.

            // WE MUST process.chdir(targetDir) !
            process.chdir(targetDir);

            // create() wraps its own inputs if arguments passed? 
            // create(name, templateKey) ignores prompts if passed.
            await create(firstAppName, firstAppTemplate as any);

            // Loop for more apps
            let addMore = true;
            while (addMore) {
                const more = await confirm({
                    message: 'Do you want to add another application?',
                    initialValue: false
                });

                if (!more || typeof more === 'symbol') {
                    addMore = false;
                    break;
                }
                await create(); // Interactive
            }
        }

    } catch (e) {
        s.stop('Failed.');
        console.error(e);
        process.exit(1);
    }
}
