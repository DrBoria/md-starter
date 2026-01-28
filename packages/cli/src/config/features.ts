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
        label: 'Shared Linting (@md/eslint)',
        category: 'core',
        packageJsonKeys: ['@md/eslint', 'eslint-config-prettier', 'eslint'],
        filesToRemove: ['packages/eslint', '.eslintrc.js', 'eslint.config.js']
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
        label: 'Shared Utils (@md/utils)',
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
        // If kept, we will further prune INSIDE it based on sub-selection (handled in init flow)
    }
];

// --- COMPONENT REGISTRY (Granular) ---
// This maps individual components inside packages/components to their files.
// We only use this if 'components' feature is selected.
export interface ComponentDef {
    id: string;
    label: string;
    // Files relative to packages/components/src/
    files: string[];
    dependencies: string[];
}

export const COMPONENTS: ComponentDef[] = [
    { id: 'Charts', label: 'Charts (Recharts)', files: ['components/default/Charts'], dependencies: ['recharts', 'd3-scale'] },
    { id: 'Editor', label: 'Rich Text Editor', files: ['components/default/HtmlEditor'], dependencies: ['@tiptap/react', '@tiptap/starter-kit'] },
    { id: 'Maps', label: 'Maps', files: ['components/default/Maps'], dependencies: ['react-map-gl'] },
    // Base UI is usually kept by default or selected as a group
    {
        id: 'BaseUI', label: 'Base UI (Buttons, Inputs, etc.)', files: [
            'components/default/Button', 'components/default/Card', 'components/default/Input',
            'components/default/Typography', 'components/default/Modals'
        ], dependencies: []
    }
];
