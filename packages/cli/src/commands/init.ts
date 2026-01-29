import { confirm, text, spinner, multiselect, select } from '@clack/prompts';
import * as fs from 'fs-extra';
import * as path from 'path';
import chalk from 'chalk';
import { getRootTemplatePath } from '../utils/paths';
import { create } from './create';
import { FEATURES, COMPONENTS, SECTIONS } from '../config/features';
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

        // 2a. Select Core Features (Repos)
        console.log(chalk.bold.cyan('\n🔨 Sculpting your Monorepo...'));

        const coreFeatures = FEATURES.filter(f => f.category !== 'ui'); // Core, Logic, Infra
        // We might want to include 'native' in the list if it's considered a repo? In features.ts it is, but user said 'packages/native' is content.
        // Let's stick to what we defined: 'eslint', 'api', 'utils', 'infra'. 'native' is UI.

        const selectedCoreFeatureIds = await multiselect({
            message: 'Select Shared Packages (Core) to include:',
            options: coreFeatures.map(f => ({
                value: f.id,
                label: f.label,
                hint: f.category
            })),
            initialValues: coreFeatures.map(f => f.id)
        }) as string[];

        let selectedFeatureIds = [...selectedCoreFeatureIds];
        let appName: string | undefined;
        let selectedTemplateKey: string | undefined;

        // 3. Ask about App EARLY
        const shouldAddApp = await confirm({
            message: 'Do you want to add your first application now?',
            initialValue: true
        });

        let allowedGroups: string[] | undefined; // If undefined, show all

        if (shouldAddApp) {
            appName = await text({
                message: 'What is the name of your new project?',
                placeholder: 'my-super-site',
                validate: (value) => {
                    if (!value) return 'Name is required';
                    if (!/^[a-z0-9-]+$/.test(value)) return 'Name must be lowercase, numbers, and hyphens only';
                }
            }) as string;

            // Import locally to avoid circular dependency issues or just use strings if possible? 
            // We need TEMPLATES. Let's import it at top.
            const { TEMPLATES } = require('../config/templates');

            selectedTemplateKey = await select({
                message: 'Select a template:',
                options: Object.entries(TEMPLATES).map(([key, config]: any) => ({
                    value: key,
                    label: config.label
                }))
            }) as string;

            // Determine constraints
            // We need to resolve where the template IS in the CLI package.
            // bundle-templates.ts copies apps/_template-* -> templates/_template-*
            // We can assume templates are siblings to 'root' in the dist/templates folder.
            const templatesDir = path.dirname(templateRoot);
            const selectedTemplateDir = path.join(templatesDir, selectedTemplateKey!);

            const configPath = path.join(selectedTemplateDir, 'md-config.json');

            if (fs.existsSync(configPath)) {
                const config = await fs.readJson(configPath);
                allowedGroups = config.allowedGroups;

                if (config.allowedFeatures) {
                    for (const feat of config.allowedFeatures) {
                        if (!selectedFeatureIds.includes(feat)) {
                            selectedFeatureIds.push(feat);
                        }
                    }
                }
            } else {
                console.warn(chalk.yellow(`⚠️  Config not found at ${configPath}. Assuming all features/components.`));
                // Default to all allowed if no config found? Or none? 
                // Let's assume undefined allowedGroups means "ALL" (handled below).
            }
        } else {
            // If no app, maybe ask for UI Features manually?
            // For simplicity, let's assume if no app, we keep everything or ask generic questions.
            // Let's ask for UI features manually if no app.
            const uiFeatures = FEATURES.filter(f => f.category === 'ui');
            const selectedUiIds = await multiselect({
                message: 'Select UI Libraries to include:',
                options: uiFeatures.map(f => ({ value: f.id, label: f.label })),
                initialValues: uiFeatures.map(f => f.id)
            }) as string[];
            selectedFeatureIds.push(...selectedUiIds);
        }

        // --- PRUNING ---
        await pruneMonorepo(targetDir, selectedFeatureIds);

        // --- COMPONENT PRUNING ---
        // Now select content based on allowedGroups
        if (selectedFeatureIds.includes('components')) {
            // Filter options
            let options = COMPONENTS;
            if (allowedGroups) {
                options = COMPONENTS.filter(c => allowedGroups!.includes(c.group));
            }

            if (options.length > 0) {
                const selectedComponentIds = await multiselect({
                    message: allowedGroups
                        ? `Select Components (Recommended for ${selectedTemplateKey}):`
                        : 'Select Components for @md/components library:',
                    options: options.map(c => ({ value: c.id, label: c.label })),
                    initialValues: options.map(c => c.id),
                    required: false
                }) as string[];

                if (Array.isArray(selectedComponentIds)) {
                    // We need to keep the selected ones AND potentially prune the ones that were HIDDEN.
                    // pruneComponentLibrary takes "keptComponents".
                    // If we only pass the selected subset of 'options', the others (not in options) will be removed?
                    // pruneComponentLibrary(..., selectedComps, ALL_COMPONENTS). 
                    // It iterates through ALL_COMPONENTS. If a comp is not in 'selectedComps', it is removed.
                    // So yes, hidden components will be removed. Perfect.
                    const selectedComps = COMPONENTS.filter(c => selectedComponentIds.includes(c.id));
                    await pruneComponentLibrary(path.join(targetDir, 'packages/components'), selectedComps, COMPONENTS);
                }
            } else {
                // If allowedGroups is empty (e.g. native template), remove ALL components?
                // Or maybe just remove the dir? 'pruneMonorepo' kept 'packages/components' because 'components' feature was in 'allowedFeatures'?
                // If 'native' template, 'components' feature is NOT in allowedFeatures (see TEMPLATE_CONFIG).
                // So packages/components is already deleted by pruneMonorepo.
                // We should check if directory exists before pruning inside it.
                if (fs.existsSync(path.join(targetDir, 'packages/components'))) {
                    await pruneComponentLibrary(path.join(targetDir, 'packages/components'), [], COMPONENTS);
                }
            }
        }

        if (selectedFeatureIds.includes('sections')) {
            let options = SECTIONS;
            if (allowedGroups) {
                options = SECTIONS.filter(s => allowedGroups!.includes(s.group));
            }

            if (options.length > 0) {
                const selectedSectionIds = await multiselect({
                    message: allowedGroups
                        ? `Select Sections (Recommended for ${selectedTemplateKey}):`
                        : 'Select Sections for @md/sections library:',
                    options: options.map(s => ({ value: s.id, label: s.label })),
                    initialValues: options.map(s => s.id),
                    required: false
                }) as string[];

                if (Array.isArray(selectedSectionIds)) {
                    const selectedSections = SECTIONS.filter(s => selectedSectionIds.includes(s.id));
                    await pruneComponentLibrary(path.join(targetDir, 'packages/sections'), selectedSections, SECTIONS);
                }
            }
        }

        // Change process CWD to targetDir so subsequent commands run inside the new repo
        process.chdir(targetDir);

        console.log(chalk.green('\nSuccess! Monorepo foundation created and sculpted.'));

        // 3. Chain "Add App" (Sculptor)
        if (shouldAddApp && appName && selectedTemplateKey) {
            // We pass the already collected info
            await create(appName, selectedTemplateKey as any);
        } else {
            console.log(`\nNext steps:`);
            console.log(`  ${chalk.cyan('cd ' + path.relative(process.cwd(), targetDir))}`);
            console.log(`  ${chalk.cyan('pnpm install')}`);
            console.log(`  ${chalk.cyan('npx md-starter add')}`);
        }

    } catch (error) {
        s.stop('Failed.');
        console.error(chalk.red(error));
    }
}
