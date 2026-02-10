export interface FeatureDef {
    id: string;          // Internal ID
    label: string;       // CLI Display Name
    category: 'core' | 'ui' | 'logic' | 'infra';

    // Dependencies to REMOVE from package.json if feature is NOT selected
    packageJsonKeys: string[];

    // Files/Folders to DELETE if feature is NOT selected (relative to target root)
    filesToRemove: string[];

    // AST Logic: Named exports to keep in specific files (optional, for component libraries)
    componentExports?: string[];
}

export const FEATURES: FeatureDef[] = [
    // --- CORE PACKAGES ---
    {
        id: 'eslint',
        label: 'ESLint Linting (@md/eslint)',
        category: 'core',
        packageJsonKeys: ['@md/eslint', 'eslint-config-prettier', 'eslint'],
        filesToRemove: ['packages/eslint', '.eslintrc.js', 'eslint.config.js']
    },
    {
        id: 'stylelint',
        label: 'Style Linting (@md/stylelint)',
        category: 'core',
        packageJsonKeys: ['@md/stylelint', 'stylelint'],
        filesToRemove: ['packages/stylelint', '.stylelintrc.js']
    },
    {
        id: 'tsconfig',
        label: 'TypeScript Config (@md/tsconfig)',
        category: 'core',
        packageJsonKeys: ['@md/tsconfig'],
        filesToRemove: ['packages/tsconfig']
    },
    {
        id: 'types',
        label: 'Types (@md/types)',
        category: 'core',
        packageJsonKeys: ['@md/types'],
        filesToRemove: ['packages/types']
    },
    {
        id: 'styles',
        label: 'Styles & Themes (@md/styles)',
        category: 'core',
        packageJsonKeys: ['@md/styles'],
        filesToRemove: ['packages/styles']
    },
    {
        id: 'infrastructure',
        label: 'Infrastructure (@md/infrastructure)',
        category: 'infra',
        packageJsonKeys: ['@md/infrastructure'],
        filesToRemove: ['packages/infrastructure']
    },
    {
        id: 'api',
        label: 'API Client (@md/api)',
        category: 'logic',
        packageJsonKeys: ['@md/api', '@tanstack/react-query'],
        filesToRemove: ['packages/api']
    },
    {
        id: 'utils',
        label: 'Utils (@md/utils)',
        category: 'logic',
        packageJsonKeys: ['@md/utils'],
        filesToRemove: ['packages/utils']
    },
    {
        id: 'native',
        label: 'Native UI (@md/native)',
        category: 'ui',
        packageJsonKeys: ['@md/native'],
        filesToRemove: ['packages/native']
    },

    // --- UI COMPONENTS ---
    // Note: The main component library is @md/components. 
    // We can allow selecting specific sub-features if we split them, 
    // or we treat @md/components as one big block for now, OR prune export list.
    // User requested: "Ask which components to copy".
    // Since 'init' copies the 'packages' folder, we can prune INSIDE 'packages/components'.
    // But for 'init', we are pruning the ROOT repo structure.
    // If we want granular component selection for the SHARED PACKAGE, we need to inspect packages/components.

    {
        id: 'components',
        label: 'Resulting Component Library (@md/components)',
        category: 'ui',
        packageJsonKeys: ['@md/components'],
        filesToRemove: ['packages/components'], // Entire package
    },
    {
        id: 'sections',
        label: 'Sections Library (@md/sections)',
        category: 'ui',
        packageJsonKeys: ['@md/sections'],
        filesToRemove: ['packages/sections'], // Entire package
    }
];

// Interface is imported from registry.generated

// -------------------------------------------------------------------------
// RE-EXPORT GENERATED REGISTRIES
// -------------------------------------------------------------------------
import { GENERATED_COMPONENTS, GENERATED_SECTIONS, ComponentDef as GenComponentDef } from './registry.generated';

export type ComponentDef = GenComponentDef;

export const COMPONENTS: ComponentDef[] = GENERATED_COMPONENTS;

export const SECTIONS: ComponentDef[] = GENERATED_SECTIONS;

// TEMPLATE_CONFIG removed. Configuration is now loaded from md-starter.json in the template directory.
