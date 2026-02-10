import { multiselect, spinner } from '@clack/prompts';
import * as path from 'path';
import chalk from 'chalk';
import { FEATURES, COMPONENTS, ComponentDef } from '../config/features';
import { getRootTemplatePath } from '../utils/paths';
import { installFeature } from '../actions/install';
import { exists, readJson } from '../utils/filesystem';
import { pruneComponentLibrary } from '../actions/prune'; // from actions/prune, unrelated to sculpt.ts

export async function addFeature() {
    console.log(chalk.cyan('MD Starter - Add Feature'));

    const projectRoot = process.cwd();
    // Verify we are in a valid project
    if (!await exists(path.join(projectRoot, 'package.json'))) {
        console.error(chalk.red('No package.json found. Are you in the project root?'));
        return;
    }

    // 1. SCAN INSTALLED FEATURES
    const pkgPath = path.join(projectRoot, 'package.json');
    const pkg = await readJson(pkgPath);

    if (!pkg) {
        console.error(chalk.red('Could not read package.json'));
        return;
    }

    const missingFeatures = FEATURES.filter(f => {
        // Simple check: Check first file in filesToRemove.
        // We need async check, so we filter later.
        return true;
    });

    // Async filter
    const availableFeatures = [];
    for (const f of missingFeatures) {
        let installed = false;
        for (const file of f.filesToRemove) {
            if (await exists(path.join(projectRoot, file))) {
                installed = true;
                break;
            }
        }
        if (!installed) {
            availableFeatures.push(f);
        }
    }

    if (availableFeatures.length === 0) {
        console.log(chalk.green('All known features are already installed!'));
        return;
    }

    // 2. PROMPT USER
    const selectedIds = await multiselect({
        message: 'Select features to add:',
        options: availableFeatures.map(f => ({
            value: f.id,
            label: f.label,
            hint: f.category
        })),
        required: true
    }) as string[];

    // 3. SPECIAL HANDLING: COMPONENTS
    let selectedComponents: ComponentDef[] = [];
    if (selectedIds.includes('components')) {
        // COMPONENTS is imported from config/features
        const selection = await multiselect({
            message: 'Select components to include (others will be pruned from fresh set):',
            options: COMPONENTS.map(c => ({ value: c.id, label: c.label })),
            required: true
        }) as string[];

        selectedComponents = COMPONENTS.filter((c: any) => selection.includes(c.id));
    }

    const s = spinner();
    s.start('Installing features...');

    try {
        const templateRoot = getRootTemplatePath();

        for (const id of selectedIds) {
            const feature = FEATURES.find(f => f.id === id);
            if (!feature) continue;

            s.message(`Installing ${feature.label}...`);
            await installFeature(projectRoot, templateRoot, feature);

            // Post-install steps
            if (id === 'components') {
                s.message('Sculpting components...');
                const componentsDir = path.join(projectRoot, 'packages/components');
                // Pruning the SHARED LIBRARY using actions/prune.ts
                await pruneComponentLibrary(componentsDir, selectedComponents, COMPONENTS);
            }
        }

        s.stop('Features installed successfully.');
        console.log(chalk.green('\nDon\'t forget to run pnpm install!'));

    } catch (e) {
        s.stop('Failed.');
        console.error(e);
    }
}
