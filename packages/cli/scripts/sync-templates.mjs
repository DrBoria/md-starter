import { readdirSync, copyFileSync, existsSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const appsDir = resolve(__dirname, '../../../apps');
const templatesDir = resolve(__dirname, '../templates');

const SYNC_FILES = ['md-config.json'];

const templateDirs = readdirSync(appsDir).filter(d => d.startsWith('_template-'));

let synced = 0;
for (const dir of templateDirs) {
    for (const file of SYNC_FILES) {
        const src = join(appsDir, dir, file);
        const dest = join(templatesDir, dir, file);

        if (!existsSync(src)) continue;
        if (!existsSync(join(templatesDir, dir))) continue;

        copyFileSync(src, dest);
        synced++;
    }
}

console.log(`✅ Synced ${synced} template config files`);
