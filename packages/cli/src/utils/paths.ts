import * as path from 'path';
import * as fs from 'fs';

export function getTemplateRoot(): string {
    // 1. Prod Mode: Templates are bundled in ../../templates (relative to dist/src/utils or similar)
    // Depending on build structure:
    // src/utils/paths.ts -> dist/utils/paths.js
    // Package root is ../../ from dist
    // Templates are at package_root/templates

    // Let's resolve package root from the compiled file location
    // __dirname is .../dist/utils
    const packageRoot = path.resolve(__dirname, '../../');
    const bundledTemplates = path.join(packageRoot, 'templates');

    if (fs.existsSync(bundledTemplates)) {
        return bundledTemplates;
    }

    // 2. Dev Mode: We are in packages/cli/src/utils
    // Repo root is ../../../../
    // Apps are in repo_root/apps
    const repoRoot = path.resolve(__dirname, '../../../../');
    const appsDir = path.join(repoRoot, 'apps');

    // In Dev mode, we return the 'apps' directory as the template root
    // But wait, the bundler flattens them into 'templates/_template-landing'
    // While in monorepo they are 'apps/_template-landing'.
    // So if we return 'apps' dir, looking for '_template-landing' works.

    return appsDir;
}

export function getTemplatePath(templateName: string): string {
    const root = getTemplateRoot();
    return path.join(root, templateName);
}

export function getRootTemplatePath(): string {
    // Specifically for 'init' command which needs the 'root' template
    // In Prod: templates/root
    // In Dev: We need to point to the actual repo root? 
    // Creating a new repo *from* the current repo in Dev mode is tricky because we don't want to copy .git or node_modules.
    // The bundler handles filtering.
    // For Dev mode 'init', we might need to simulate it or just point to repo root and apply aggressive filtering similar to bundler.

    const root = getTemplateRoot();

    // If we are in bundled mode, 'root' folder exists
    if (root.endsWith('templates')) {
        return path.join(root, 'root');
    }

    // If we are in Dev mode (root is 'apps' dir), we actually want the REPO ROOT
    // equivalent to where 'apps' sits.
    return path.resolve(root, '../');
}
