import * as path from 'path';
import * as fs from 'fs-extra';
import { readJson, writeJson, remove } from '../../utils/filesystem';
import chalk from 'chalk';

const MD_CONFIG_FILENAME = 'md-config.json';

import { DEPLOYMENT_REGISTRY, DeploymentType } from '../../config/deployments';

export interface Needs {
    features: Set<string>;
    groups: Set<string>;
    infrastructureFolders: Set<string>;
}

export async function collectAllNeeds(monorepoRoot: string): Promise<Needs> {
    const appsDir = path.join(monorepoRoot, 'apps');
    const features = new Set<string>();
    const groups = new Set<string>();
    const infrastructureFolders = new Set<string>();

    if (!await fs.pathExists(appsDir)) return { features, groups, infrastructureFolders };

    const dirs = await fs.readdir(appsDir, { withFileTypes: true });

    for (const dir of dirs) {
        if (!dir.isDirectory()) continue;
        // Original code filtered out _template- dirs, but the new code doesn't explicitly.
        // Assuming the new instruction implies removing that filter for simplicity,
        // or that the try/catch will handle template dirs if they don't have a valid config.
        // Let's keep the original filter for robustness if the instruction didn't explicitly remove it.
        // Re-reading the instruction, it says `const dirs = await fs.readdir(appsDir, { withFileTypes: true });`
        // and then `if (!dir.isDirectory()) continue;`. It doesn't include the `!e.name.startsWith('_template-')` filter.
        // I will follow the instruction exactly.

        const configPath = path.join(appsDir, dir.name, MD_CONFIG_FILENAME);
        const pkgPath = path.join(appsDir, dir.name, 'package.json');

        try {
            let config: any = {};

            // Migration: Check for md-config.json
            if (await fs.pathExists(configPath)) {
                const legacyConfig = await readJson(configPath);
                if (await fs.pathExists(pkgPath)) {
                    const pkg = await readJson(pkgPath);
                    pkg.mdConfig = legacyConfig;
                    await writeJson(pkgPath, pkg);
                    await remove(configPath);
                    console.log(chalk.dim(`   [Sculptor] Migrated ${MD_CONFIG_FILENAME} to package.json for app '${dir.name}'`));
                    config = legacyConfig;
                }
            } else if (await fs.pathExists(pkgPath)) {
                const pkg = await readJson(pkgPath);
                config = pkg.mdConfig || {};
            }

            if (config.allowedFeatures) {
                config.allowedFeatures.forEach((f: string) => features.add(f));
            }
            if (config.allowedGroups) {
                config.allowedGroups.forEach((g: string) => groups.add(g));
            }

            // Collect infrastructure folders logic
            if (config.infrastructure?.strategy && config.infrastructure?.provider) {
                const { strategy, provider } = config.infrastructure;
                // DEPLOYMENT_REGISTRY might be undefined if imports are circular or not loaded? 
                // Using explicit loop/check
                // Assuming DEPLOYMENT_REGISTRY is available.
                // Note: strategy is key, provider is key.
                const deployConfig = DEPLOYMENT_REGISTRY[strategy]?.[provider];

                if (deployConfig?.importPath) {
                    const parts = deployConfig.importPath.split('/');
                    const distIndex = parts.indexOf('dist');
                    if (distIndex !== -1 && parts[distIndex + 1]) {
                        infrastructureFolders.add(parts[distIndex + 1]);
                    }
                }
            }

            // console.log(chalk.dim(`   [Sculptor] App '${dir.name}' needs: ...`));

        } catch (e) {
            // Ignore apps without config or with malformed config
        }
    }

    return { features, groups, infrastructureFolders };
}
