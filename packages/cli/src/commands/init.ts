import { text, confirm, spinner } from '@clack/prompts';
import { checkCancel } from '../utils/prompts';
import * as path from 'path';
import chalk from 'chalk';
import { getRootTemplatePath } from '../utils/paths';
import { create } from './create';
import { isDirectoryEmpty, cloneTemplate } from '../actions/repository';
import { setProjectName } from '../actions/project';

export async function init() {
    console.log(chalk.bold.cyan('MD Starter - Initialize Monorepo'));

    const projectNamePrompt = await text({
        message: 'What is the name of your monorepo? (use "." for current directory)',
        placeholder: 'my-monorepo',
        validate: (value) => {
            if (!value) return 'Name is required';
        }
    });
    checkCancel(projectNamePrompt);
    const projectName = projectNamePrompt as string;
    if (!projectName) return;

    const useCurrentDir = projectName === '.';
    const targetDir = useCurrentDir
        ? process.cwd()
        : path.resolve(process.cwd(), projectName);

    const dirName = useCurrentDir ? path.basename(targetDir) : projectName;

    if (!await isDirectoryEmpty(targetDir)) {
        console.error(chalk.red(`Error: Directory "${dirName}" is not empty.`));
        console.error(chalk.yellow(`Please choose a different name or use a different directory.`));
        process.exit(1);
    }

    const s = spinner();
    s.start('Scaffolding monorepo...');

    try {
        const rootTemplate = getRootTemplatePath();

        s.message('Cloning root template...');
        await cloneTemplate(rootTemplate, targetDir);

        s.message('Setting project name...');
        await setProjectName(targetDir, dirName);

        s.stop('Monorepo scaffolded.');

        if (!useCurrentDir) {
            process.chdir(targetDir);
        }

        // Straight to app creation loop — features are handled per-app
        let isFirst = true;
        while (true) {
            const addPrompt = await confirm({
                message: isFirst
                    ? 'Add your first application?'
                    : 'Add another application?',
                initialValue: isFirst
            });
            checkCancel(addPrompt);
            if (!addPrompt) break;

            await create();
            isFirst = false;
        }

        console.log(chalk.green(`\nMonorepo "${dirName}" is ready!`));
        console.log(`\nNext steps:`);
        if (!useCurrentDir) {
            console.log(`  cd ${projectName}`);
        }
        console.log(`  pnpm install`);

    } catch (e) {
        s.stop('Failed.');
        console.error(e);
        process.exit(1);
    }
}
