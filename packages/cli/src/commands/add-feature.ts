import { multiselect, spinner } from '@clack/prompts';
import * as path from 'path';
import chalk from 'chalk';
import { FEATURES } from '../config/features';
import { exists } from '../utils/filesystem';
import { sculptMonorepo } from '../actions/sculpting';

export async function addFeature() {
    console.log(chalk.cyan('MD Starter - Add Feature'));

    const projectRoot = process.cwd();
    if (!await exists(path.join(projectRoot, 'package.json'))) {
        console.error(chalk.red('No package.json found. Are you in the project root?'));
        return;
    }

    const availableFeatures = [];
    for (const f of FEATURES) {
        let installed = false;
        for (const file of f.filesToRemove) {
            if (await exists(path.join(projectRoot, file))) {
                installed = true;
                break;
            }
        }
        if (!installed) {
            availableFeatures.push(f);
        }
    }

    if (availableFeatures.length === 0) {
        console.log(chalk.green('All known features are already installed!'));
        return;
    }

    const selectedIds = await multiselect({
        message: 'Select features to add:',
        options: availableFeatures.map(f => ({
            value: f.id,
            label: f.label,
            hint: f.category
        })),
        required: true
    }) as string[];

    const s = spinner();
    s.start('Sculpting monorepo...');

    try {
        // Sculptor reads all apps' md-config.json and prunes accordingly
        await sculptMonorepo(projectRoot);
        s.stop('Done.');
        console.log(chalk.green('\nDon\'t forget to run pnpm install!'));
    } catch (e) {
        s.stop('Failed.');
        console.error(e);
    }
}
