import { confirm, text, spinner, multiselect } from '@clack/prompts';
import * as fs from 'fs-extra';
import * as path from 'path';
import chalk from 'chalk';
import { getRootTemplatePath } from '../utils/paths';
import { create } from './create';
import { FEATURES, COMPONENTS } from '../config/features';
import { pruneMonorepo, pruneComponentLibrary } from '../actions/prune';

export async function init(projectName?: string) {
    console.log(chalk.bold.cyan('MD Starter - Init Monorepo'));

    // 1. Determine Target Directory
    let targetDir = process.cwd();
    if (projectName) {
        targetDir = path.resolve(process.cwd(), projectName);
    } else {
        const dirName = await text({
            message: 'Where should we create the monorepo?',
            placeholder: './ (current directory)',
            defaultValue: '.'
        }) as string;

        if (dirName !== '.') {
            targetDir = path.resolve(process.cwd(), dirName);
        }
    }

    // 2. Check emptiness
    if (fs.existsSync(targetDir)) {
        const files = await fs.readdir(targetDir);
        if (files.length > 0) {
            const shouldContinue = await confirm({
                message: `Directory "${path.basename(targetDir)}" is not empty. Continue?`,
            });
            if (!shouldContinue) return;
        }
    } else {
        await fs.mkdirp(targetDir);
    }

    const s = spinner();
    s.start('Scaffolding monorepo...');

    try {
        const templateRoot = getRootTemplatePath();

        if (!fs.existsSync(templateRoot)) {
            throw new Error(`Root template not found at: ${templateRoot}`);
        }

        // Copy everything from template/root to Target Directory
        await fs.copy(templateRoot, targetDir);

        s.stop('Monorepo structure copied.');

        // 2a. Feature Selection (The Sculptor Phase 1)
        console.log(chalk.bold.cyan('\n🔨 Sculpting your Monorepo...'));

        const selectedFeatureIds = await multiselect({
            message: 'Select Shared Packages (Features) to include:',
            options: FEATURES.map(f => ({
                value: f.id,
                label: f.label,
                hint: f.category
            })),
            initialValues: FEATURES.map(f => f.id) // Default all checked
        }) as string[];

        if (Array.isArray(selectedFeatureIds)) {
            // Prune Root
            await pruneMonorepo(targetDir, selectedFeatureIds);

            // 2b. Component Selection (Phase 2)
            if (selectedFeatureIds.includes('components')) {
                const selectedComponentIds = await multiselect({
                    message: 'Select Components for @md/components library:',
                    options: COMPONENTS.map(c => ({ value: c.id, label: c.label })),
                    initialValues: COMPONENTS.map(c => c.id), // Default all checked
                    required: false
                }) as string[];

                if (Array.isArray(selectedComponentIds)) {
                    const selectedComps = COMPONENTS.filter(c => selectedComponentIds.includes(c.id));
                    await pruneComponentLibrary(path.join(targetDir, 'packages/components'), selectedComps, COMPONENTS);
                }
            }
        }

        // Change process CWD to targetDir so subsequent commands run inside the new repo
        process.chdir(targetDir);

        console.log(chalk.green('\nSuccess! Monorepo foundation created and sculpted.'));

        // 3. Chain "Add App" (Sculptor)
        const shouldAddApp = await confirm({
            message: 'Do you want to add your first application now?',
            initialValue: true
        });

        if (shouldAddApp) {
            await create();
        } else {
            console.log(`\nNext steps:`);
            console.log(`  ${chalk.cyan('cd ' + path.relative(process.cwd(), targetDir))}`);
            console.log(`  ${chalk.cyan('pnpm install')}`);
            console.log(`  ${chalk.cyan('npx create-md-stack add')}`);
        }

    } catch (error) {
        s.stop('Failed.');
        console.error(chalk.red(error));
    }
}
