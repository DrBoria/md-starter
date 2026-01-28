import { confirm, text, spinner } from '@clack/prompts';
import * as fs from 'fs-extra';
import * as path from 'path';
import chalk from 'chalk';
import { getRootTemplatePath } from '../utils/paths';

export async function init() {
    console.log(chalk.bold.cyan('MD Starter - Init Monorepo'));

    // Check if directory is empty or prompt
    const cwd = process.cwd();
    const files = await fs.readdir(cwd);
    if (files.length > 0) {
        const shouldContinue = await confirm({
            message: 'Current directory is not empty. Do you want to initialize here anyway?',
        });
        if (!shouldContinue) return;
    }

    const s = spinner();
    s.start('Scaffolding monorepo...');

    try {
        const templateRoot = getRootTemplatePath();

        if (!fs.existsSync(templateRoot)) {
            throw new Error(`Root template not found at: ${templateRoot}`);
        }

        // Copy everything from template/root to CWD
        await fs.copy(templateRoot, cwd);

        // Rename _gitignore to .gitignore if needed (sometimes npm naming issues)
        // But our bundler copies .gitignore directly.

        s.stop('Monorepo initialized!');

        console.log(chalk.green('\nSuccess! Your monorepo is ready.'));
        console.log(`\nNext steps:`);
        console.log(`  ${chalk.cyan('pnpm install')}`);
        console.log(`  ${chalk.cyan('npx md-starter add')}  (to create a new app)`);

    } catch (error) {
        s.stop('Failed.');
        console.error(chalk.red(error));
    }
}
