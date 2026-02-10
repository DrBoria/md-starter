import { text, confirm, multiselect, select, spinner } from '@clack/prompts';
import { checkCancel, selectComponents } from '../utils/prompts';
import * as path from 'path';
import chalk from 'chalk';
import { TEMPLATES, TemplateKey } from '../config/templates';
import { DEPLOYMENT_REGISTRY, DeployConfig } from '../config/deployments';
import { cloneTemplate } from '../actions/repository';
import { setProjectName } from '../actions/project';
import { pruneComponents, pruneUiKitConfig } from '../actions/sculpt';
import { configureInfrastructure } from '../actions/setup';
import { remove } from '../utils/filesystem';

export async function create(initialProjectName?: string, initialTemplateKey?: TemplateKey) {
    console.log(chalk.bold.cyan('MD Starter - Create New App'));

    // 1. PROJECT NAME
    let projectName = initialProjectName;
    if (!projectName) {
        projectName = await text({
            message: 'What is the name of your new project?',
            placeholder: 'my-super-site',
            validate: (value) => {
                if (!value) return 'Name is required';
                if (!/^[a-z0-9-]+$/.test(value)) return 'Name must be lowercase, numbers, and hyphens only';
            }
        }) as string;
        if (typeof projectName !== 'string') return;
    }

    // 2. TEMPLATE SELECTION
    let templateKey = initialTemplateKey;
    if (!templateKey) {
        const templateSelection = await select({
            message: 'Select a template:',
            options: Object.entries(TEMPLATES).map(([key, config]) => ({
                value: key,
                label: config.label
            }))
        });
        checkCancel(templateSelection);
        templateKey = templateSelection as TemplateKey;
    }

    if (!templateKey) return;
    const templateConfig = TEMPLATES[templateKey];

    // 3. COMPONENT SELECTION
    let selectedComponents: string[] = [];
    if (templateConfig.componentPkg) {
        const { COMPONENTS } = require('../config/features');
        selectedComponents = await selectComponents(COMPONENTS);
    }

    // 4. INFRASTRUCTURE 
    let includeInfra = false;
    let selectedConfig: DeployConfig | null = null;
    let strategy = '';
    let provider = '';

    if (templateConfig.infraType) {
        const includeInfraPrompt = await confirm({
            message: 'Include infrastructure configuration?'
        });
        checkCancel(includeInfraPrompt);
        includeInfra = includeInfraPrompt as boolean;

        if (includeInfra) {
            const strategySelection = await select({
                message: 'Select Deployment Strategy:',
                options: Object.keys(DEPLOYMENT_REGISTRY).map(key => ({
                    value: key,
                    label: key.charAt(0).toUpperCase() + key.slice(1)
                }))
            });
            checkCancel(strategySelection);
            strategy = strategySelection as string;

            const providers = DEPLOYMENT_REGISTRY[strategy];
            const providerSelection = await select({
                message: `Select Provider for ${strategy}:`,
                options: Object.entries(providers).map(([key, cfg]) => ({
                    value: key,
                    label: cfg.label
                }))
            });
            checkCancel(providerSelection);
            provider = providerSelection as string;

            selectedConfig = providers[provider];
        }
    }

    const s = spinner();
    s.start(`Sculpting ${projectName} from ${templateKey}...`);

    try {
        const templateDir = templateConfig.dir;
        const targetDir = path.resolve(process.cwd(), 'apps', projectName);

        // --- ACTION: CLONE ---
        s.message('Cloning template...');
        await cloneTemplate(templateDir, targetDir);

        // --- ACTION: PROJECT METADATA ---
        s.message('Updating package.json...');
        await setProjectName(targetDir, projectName);

        // --- ACTION: SCULPT COMPONENTS ---
        if (templateConfig.componentPkg) {
            s.message(`Pruning unused components from ${templateConfig.componentPkg}...`);
            await pruneComponents(targetDir, templateConfig.componentPkg, selectedComponents);
        }

        if (templateKey === 'styleguide') {
            s.message('Configuring UI Kit...');
            const styleguideConfigPath = path.join(targetDir, 'styleguide.config.js');
            await pruneUiKitConfig(styleguideConfigPath, selectedComponents);
        }

        // --- ACTION: SETUP INFRA ---
        if (includeInfra && selectedConfig) {
            s.message(`Configuring infrastructure (${strategy} / ${provider})...`);
            await configureInfrastructure(targetDir, projectName, selectedConfig);
        } else {
            const infraDir = path.join(targetDir, 'infrastructure');
            await remove(infraDir);
        }

        s.stop(`Successfully created ${chalk.cyan(projectName)}!`);

        console.log(chalk.green(`\nCreated ${projectName} using ${templateKey} template.`));
        console.log(`\nNext steps:`);
        console.log(`  cd apps/${projectName}`);
        console.log(`  pnpm install`);
        if (includeInfra) {
            console.log(`  pnpm deploy (uses ${provider})`);
        }

    } catch (error) {
        s.stop('Failed.');
        console.error(chalk.red(error));
    }
}
