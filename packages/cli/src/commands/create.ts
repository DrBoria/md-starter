import { text, confirm, multiselect, select, spinner } from '@clack/prompts';
import { checkCancel } from '../utils/prompts';
import * as path from 'path';
import chalk from 'chalk';
import { TEMPLATES, TemplateKey } from '../config/templates';
import { FEATURES, COMPONENTS } from '../config/features';
import { DEPLOYMENT_REGISTRY, DeployConfig } from '../config/deployments';
import { cloneTemplate } from '../actions/repository';
import { setProjectName } from '../actions/project';
import { sculptMonorepo, sculptAppImports } from '../actions/sculpting';
import { configureInfrastructure } from '../actions/setup';
import { remove, readJson, writeJson, exists } from '../utils/filesystem';

const MD_CONFIG_FILENAME = 'md-config.json';

// Fallback for types, in case md-config.json doesn't have requiredFeatures yet (e.g. old templates)
// But we just updated them all.
const DEFAULT_AUTO_FEATURES = ['tsconfig', 'types', 'styles', 'components', 'sections', 'utils', 'api'];

export async function create(initialProjectName?: string, initialTemplateKey?: TemplateKey) {
    console.log(chalk.bold.cyan('MD Starter - Create New App'));

    // 1. PROJECT NAME
    let projectName = initialProjectName;
    while (true) {
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

        // Check if app already exists here
        const targetAppPath = path.resolve(process.cwd(), 'apps', projectName);
        if (await exists(targetAppPath)) {
            console.error(chalk.red(`\nError: Application "${projectName}" already exists in apps/${projectName}.\n`));

            // If passed as initial argument (e.g. CLI flag), we can't loop prompt effectively unless we switch to interactive.
            // But since 'add' doesn't take flags usually, this is fine.
            // Reset to prompt again
            if (initialProjectName) {
                // If initial was provided and failed, we should probably stop or fall through to prompt?
                // falling through to prompt is better UX.
                initialProjectName = undefined;
            }
            projectName = undefined;
            continue;
        }
        break;
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

    // 3. READ md-config.json FROM TEMPLATE
    const mdConfigPath = path.join(templateConfig.dir, MD_CONFIG_FILENAME);
    const mdConfig = await readJson<{ allowedGroups?: string[]; allowedFeatures?: string[]; requiredFeatures?: string[] }>(mdConfigPath);

    const allowedGroups = mdConfig?.allowedGroups ?? [];
    const allowedFeatures = mdConfig?.allowedFeatures ?? [];
    const requiredFeatures = mdConfig?.requiredFeatures ?? [];

    // Auto-install features are those listed in 'requiredFeatures'
    // If 'requiredFeatures' is missing, fallback to our old hardcoded list, intersected with allowedFeatures
    const autoInstallFeatureIds = mdConfig?.requiredFeatures
        ? requiredFeatures
        : allowedFeatures.filter(f => DEFAULT_AUTO_FEATURES.includes(f));

    // Optional features are allowedFeatures MINUS autoInstallFeatureIds
    const optionalFeatures = FEATURES.filter(f =>
        allowedFeatures.includes(f.id) && !autoInstallFeatureIds.includes(f.id)
    );

    // Infrastructure is optional if the template supports it
    if (templateConfig.infraType) {
        const infraFeature = FEATURES.find(f => f.id === 'infrastructure');
        if (infraFeature && !optionalFeatures.some(f => f.id === 'infrastructure')) {
            // Only add if not already in optional (it usually isn't in allowedFeatures for most templates)
            optionalFeatures.push(infraFeature);
        }
    }

    // 4. OPTIONAL FEATURE SELECTION
    let selectedOptionalIds: string[] = [];
    if (optionalFeatures.length > 0) {
        const featureSelection = await multiselect({
            message: 'Select optional packages to include:',
            options: optionalFeatures.map(f => ({
                value: f.id,
                label: f.label,
                hint: f.category
            })),
            initialValues: optionalFeatures.map(f => f.id),
            required: false
        });
        checkCancel(featureSelection);
        selectedOptionalIds = featureSelection as string[];
    }

    // Combine
    const allSelectedFeatureIds = Array.from(new Set([...autoInstallFeatureIds, ...selectedOptionalIds]));

    // 5. INFRASTRUCTURE follow-up
    let includeInfra = allSelectedFeatureIds.includes('infrastructure');
    let selectedConfig: DeployConfig | null = null;
    let strategy = '';
    let provider = '';

    if (includeInfra && templateConfig.infraType) {
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

    // --- EXECUTION ---
    const s = spinner();
    s.start(`Creating ${projectName}...`);

    try {
        const targetDir = path.resolve(process.cwd(), 'apps', projectName);
        const monorepoRoot = process.cwd();

        s.message('Cloning template...');
        await cloneTemplate(templateConfig.dir, targetDir);

        s.message('Updating package.json...');
        await setProjectName(targetDir, projectName);

        // Write resolved md-config.json to package.json
        const pkgPath = path.join(targetDir, 'package.json');
        const pkg = await readJson(pkgPath);
        pkg.mdConfig = {
            allowedGroups,
            allowedFeatures: allSelectedFeatureIds,
            requiredFeatures: mdConfig?.requiredFeatures, // Persist this if it existed
            infrastructure: includeInfra && selectedConfig ? {
                provider,
                strategy
            } : undefined
        };
        await writeJson(pkgPath, pkg);

        // Remove template's md-config.json
        await remove(path.join(targetDir, MD_CONFIG_FILENAME));

        // Infrastructure
        if (includeInfra && selectedConfig) {
            s.message(`Configuring infrastructure (${strategy} / ${provider})...`);
            await configureInfrastructure(targetDir, projectName, selectedConfig);
        } else {
            const infraDir = path.join(targetDir, 'infrastructure');
            await remove(infraDir);
        }

        // Sculpt the entire monorepo
        s.message('Sculpting monorepo...');
        await sculptMonorepo(monorepoRoot);

        // AST prune unused component imports
        if (templateConfig.componentPkg) {
            s.message('Pruning unused component imports...');
            const matchingComponents = COMPONENTS.filter(c => {
                const groupMatch = allowedGroups.includes(c.group);
                const categoryMatch = c.category ? allowedGroups.includes(c.category) : true;
                return groupMatch && categoryMatch;
            });
            const keptNames = matchingComponents.map(c => c.id);
            await sculptAppImports(targetDir, templateConfig.componentPkg, keptNames);
        }

        s.stop(`Successfully created ${chalk.cyan(projectName)}!`);

        const autoInstalledNames = autoInstallFeatureIds.map(id => {
            const f = FEATURES.find(feat => feat.id === id);
            return f ? f.label : id;
        });

        console.log(chalk.green(`\nCreated ${projectName} using ${templateKey} template.`));
        if (autoInstalledNames.length > 0) {
            console.log(chalk.dim(`  Auto-installed: ${autoInstalledNames.join(', ')}`));
        }

    } catch (error) {
        s.stop('Failed.');
        console.error(chalk.red(error));
    }
}
