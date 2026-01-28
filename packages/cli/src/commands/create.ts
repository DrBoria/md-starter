import { text, confirm, multiselect, select, spinner } from '@clack/prompts';
import * as fs from 'fs-extra';
import * as path from 'path'; // Restored
import chalk from 'chalk'; // Restored
import { TEMPLATES, TemplateKey } from '../config/templates';
import { pruneComponents } from '../utils/sculptor';
import { configureInfrastructure } from '../transformers/infra';
import { pruneUiKitConfig } from '../transformers/ui-kit';
import { DEPLOYMENT_REGISTRY, DeployConfig } from '../config/deployments';

export async function create() {
    // ... (Project Name, Template, Components logic remains same) ...
    // NOTE: This replace block targets imports and the body up to infra prompt. 
    // I need to be careful to match context.

    // Let's assume I'm replacing the whole file imports + start of function relative to previous `create.ts`.
    // Actually, I should use `replace_file_content` targeting specific blocks if possible, but the imports change too.
    // I'll try to target the imports first, then the infra block.
    // Wait, I can do it in one go if I match enough context.

    // RE-READING instruction: "Replace Infra Prompt section".
    // I will replace imports at top, then the infra logic block.
    // Since `replace_file_content` handles one contiguous block, I might need 2 calls or `multi_replace`.
    // Let's use `multi_replace`.

    // 1. PROJECT NAME
    const projectName = await text({
        message: 'What is the name of your new project?',
        placeholder: 'my-super-site',
        validate: (value) => {
            if (!value) return 'Name is required';
            if (!/^[a-z0-9-]+$/.test(value)) return 'Name must be lowercase, numbers, and hyphens only';
        }
    }) as string;
    if (typeof projectName !== 'string') return;

    // 2. TEMPLATE SELECTION
    const templateKey = await select({
        message: 'Select a template:',
        options: Object.entries(TEMPLATES).map(([key, config]) => ({
            value: key,
            label: config.label
        })) as any
    }) as TemplateKey;

    if (!templateKey) return;
    const templateConfig = TEMPLATES[templateKey];

    // 3. COMPONENT SELECTION
    let selectedComponents: string[] = [];
    if (templateConfig.componentPkg) {
        const availableComponents = [
            'Button', 'Card', 'Charts', 'HeroSimple', 'HeroVideo', 'FooterStandard', 'Header'
        ];

        const selection = await multiselect({
            message: `Select components from ${templateConfig.componentPkg} to keep:`,
            options: availableComponents.map(c => ({ value: c, label: c })),
            required: false
        });

        if (Array.isArray(selection)) selectedComponents = selection as string[];
    }

    // 4. INFRASTRUCTURE 
    let includeInfra = false;
    let selectedConfig: DeployConfig | null = null;
    let strategy = '';
    let provider = '';

    if (templateConfig.infraType) {
        includeInfra = await confirm({
            message: 'Include infrastructure configuration?'
        }) as boolean;

        if (includeInfra) {
            // 1. Select Strategy
            strategy = await select({
                message: 'Select Deployment Strategy:',
                options: Object.keys(DEPLOYMENT_REGISTRY).map(key => ({
                    value: key,
                    label: key.charAt(0).toUpperCase() + key.slice(1)
                }))
            }) as string;

            // 2. Select Provider
            const providers = DEPLOYMENT_REGISTRY[strategy];
            provider = await select({
                message: `Select Provider for ${strategy}:`,
                options: Object.entries(providers).map(([key, cfg]) => ({
                    value: key,
                    label: cfg.label
                }))
            }) as string;

            selectedConfig = providers[provider];
        }
    }

    const s = spinner();
    s.start(`Sculpting ${projectName} from ${templateKey}...`);

    try {
        const templateDir = templateConfig.dir;
        const targetDir = path.resolve(process.cwd(), 'apps', projectName);

        // --- CHECK TEMPLATE ---
        if (!fs.existsSync(templateDir)) {
            throw new Error(`Template source not found at: ${templateDir}`);
        }

        // --- CLONE ---
        s.message('Cloning template...');
        await fs.copy(templateDir, targetDir);

        // --- RENAME (Metadata) ---
        s.message('Updating package.json...');
        const pkgPath = path.join(targetDir, 'package.json');
        if (await fs.pathExists(pkgPath)) {
            const pkg = await fs.readJson(pkgPath);
            pkg.name = projectName;
            await fs.writeJson(pkgPath, pkg, { spaces: 2 });
        }

        // --- SCULPT: COMPONENT PRUNING ---
        if (templateConfig.componentPkg) {
            s.message(`Pruning unused components from ${templateConfig.componentPkg}...`);
            await pruneComponents(targetDir, templateConfig.componentPkg, selectedComponents);
        }

        if (templateKey === 'styleguide') {
            s.message('Configuring UI Kit...');
            const styleguideConfigPath = path.join(targetDir, 'styleguide.config.js');
            if (await fs.pathExists(styleguideConfigPath)) {
                await pruneUiKitConfig(styleguideConfigPath, selectedComponents);
            }
        }

        // --- SCULPT: INFRASTRUCTURE ---
        if (includeInfra && selectedConfig) {
            s.message(`Configuring infrastructure (${strategy} / ${provider})...`);
            s.message(`Configuring infrastructure (${strategy} / ${provider})...`);
            // Cast selectedConfig to any because `transformers/infra` expects RegistryConfig which is compatible but TS might complain if imports differ
            // Actually they are the same structure. 
            await configureInfrastructure(targetDir, projectName, selectedConfig as any);
        } else {
            // Remove infra folder if not selected OR if template has no infraType
            const infraDir = path.join(targetDir, 'infrastructure');
            if (await fs.pathExists(infraDir)) {
                s.message('Removing infrastructure...');
                await fs.remove(infraDir);
            }
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
