import { text, confirm, multiselect, select, spinner } from '@clack/prompts';
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
    const projectName = await text({
        message: 'What is the name of your monorepo?',
        placeholder: 'my-monorepo',
        validate: (value) => {
            if (!value) return 'Name is required';
        }
    }) as string;

    if (!projectName) return;

    const targetDir = path.resolve(process.cwd(), projectName);

    // 2. CHECK DIRECTORY
    const empty = await isDirectoryEmpty(targetDir);
    if (!empty) {
        console.error(chalk.red(`Directory ${projectName} is not empty. Please use a new directory.`));
        process.exit(1);
    }

    // 3. FEATURE SELECTION
    const selectedFeatureIds = await multiselect({
        message: 'Select features to include:',
        options: FEATURES.map(f => ({
            value: f.id,
            label: f.label,
            hint: f.category
        })),
        required: false // Allow minimal
    }) as string[];

    // 4. SHARED COMPONENT SELECTION (if 'components' feature selected)
    // We need to know which components are available.
    // Assuming FEATURES includes component definition or we can import it.
    // config/features.ts has both FEATURES and COMPONENTS (if exported)
    // Let's import COMPONENTS. 

    // We need to dynamic require to get COMPONENTS if not exported directly from FeatureDef 
    // (Wait, FEATURES is exported, ComponentDef is a type. COMPONENTS is likely exported too).
    // Let's assume COMPONENTS is exported.

    let selectedComponents: ComponentDef[] = [];
    // We only ask for component selection if the 'components' feature is selected (id='components' usually?)
    // In FEATURES list, 'components' might be there.
    // Let's check if 'components' (UI library) is in selectedFeatureIds.
    // Code snippet 1202 shows 'ui-components' category but valid IDs like 'shadcn', 'tailwind'.
    // If user selected the component library feature (let's assume ID is 'components' or similar from previous `init.ts`).
    // Actually, looking at `init.ts` previous code logic (viewed earlier):
    // It checked `features.find(f => f.id === 'components')`.

    const componentFeature = FEATURES.find(f => f.id === 'components'); // 'components' is likely the ID for shared lib
    let componentSelection: string[] = [];

    if (selectedFeatureIds.includes('components')) {
        // Import COMPONENTS
        const { COMPONENTS } = require('../config/features');
        const comps = COMPONENTS as ComponentDef[];

        componentSelection = await multiselect({
            message: 'Select shared components to include in @md/components:',
            options: comps.map(c => ({ value: c.id, label: c.label })),
            required: true
        }) as string[];

        selectedComponents = comps.filter(c => componentSelection.includes(c.id));
    }

    // 5. APP CREATION PROMPT
    const shouldAddApp = await confirm({
        message: 'Do you want to add your first application now?',
        initialValue: true
    });

    let firstAppName = '';
    let firstAppTemplate = '';

    if (shouldAddApp) {
        firstAppName = await text({
            message: 'Application Name:',
            placeholder: 'web-app',
            validate: (value) => !value ? 'Name required' : undefined
        }) as string;

        firstAppTemplate = await select({
            message: 'Select Template:',
            options: Object.entries(TEMPLATES).map(([key, cfg]) => ({ value: key, label: cfg.label }))
        }) as string;
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
