import * as fs from 'fs-extra';
import * as path from 'path';

// SOURCE (Monorepo)
const REPO_ROOT = path.resolve(__dirname, '../../../');
const APPS_DIR = path.join(REPO_ROOT, 'apps');
const PACKAGES_DIR = path.join(REPO_ROOT, 'packages');

// DESTINATION (CLI Package)
const DEST_TEMPLATES = path.resolve(__dirname, '../templates');

async function bundle() {
    console.log('📦 Bundling templates for distribution...');

    // 1. Clean
    await fs.remove(DEST_TEMPLATES);
    await fs.ensureDir(DEST_TEMPLATES);

    const appTemplates = [
        { source: 'apps/_template-landing', dest: '_template-landing' },
        { source: 'apps/_template-keystone', dest: '_template-keystone' },
        { source: 'apps/_template-native', dest: '_template-native' },
        { source: 'apps/_template-styleguide', dest: '_template-styleguide' }
    ];

    // 3. Bundle APP Templates (for `md-starter add`)
    for (const tmpl of appTemplates) {
        const src = path.join(REPO_ROOT, tmpl.source);
        const dest = path.join(DEST_TEMPLATES, tmpl.dest);

        if (await fs.pathExists(src)) {
            console.log(`   -> Copying ${tmpl.source} to ${tmpl.dest}...`);
            await fs.copy(src, dest, {
                dereference: true,
                filter: filterFunc
            });
        } else {
            console.warn(`   ⚠️ App Template not found: ${src}`);
        }
    }

    // 4. Bundle ROOT Template (for `md-starter init`)
    // We create a 'root' folder in templates that contains the monorepo structure
    const rootDest = path.join(DEST_TEMPLATES, 'root');
    await fs.ensureDir(rootDest);
    console.log(`   -> Copying Root Context (packages/, configs)...`);

    // Copy Packages (Shared) - iterate to avoid recursion (CLI is inside packages)
    const packagesDest = path.join(rootDest, 'packages');
    await fs.ensureDir(packagesDest);

    const packageEntries = await fs.readdir(PACKAGES_DIR);
    for (const entry of packageEntries) {
        if (entry === 'cli' || entry === 'node_modules' || entry === '.DS_Store') continue;

        const srcPath = path.join(PACKAGES_DIR, entry);
        const destPath = path.join(packagesDest, entry);

        // Only copy directories
        if ((await fs.stat(srcPath)).isDirectory()) {
            await fs.copy(srcPath, destPath, {
                dereference: true,
                filter: filterFunc
            });
        }
    }

    // Copy Root Configs
    const rootConfigs = [
        'package.json',
        'turbo.json',
        'pnpm-workspace.yaml',
        'pnpm-lock.yaml',
        '.gitignore',
        '.dockerignore',
        'docker-compose.yml',
        'dockerfile',
        'README.md',
        '.npmrc'
    ];

    for (const file of rootConfigs) {
        const src = path.join(REPO_ROOT, file);
        if (await fs.pathExists(src)) {
            await fs.copy(src, path.join(rootDest, file));
        }
    }

    // Create empty apps folder in root template
    await fs.ensureDir(path.join(rootDest, 'apps'));

    console.log('✅ Templates bundled successfully.');
}

function filterFunc(src: string) {
    if (src.includes('node_modules')) return false;
    if (src.includes('.turbo')) return false;
    if (src.includes('.next')) return false;
    if (src.includes('.git')) return false;
    if (src.includes('dist')) return false;
    if (src.includes('.DS_Store')) return false;
    return true;
}

bundle().catch(err => {
    console.error(err);
    process.exit(1);
});
