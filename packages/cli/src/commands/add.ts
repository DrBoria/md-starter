import { select } from '@clack/prompts';
import { create } from './create';
import { addFeature } from './add-feature';
import chalk from 'chalk';

export async function add() {
    console.log(chalk.bold.cyan('MD Starter - Add to Monorepo'));

    const action = await select({
        message: 'What would you like to add?',
        options: [
            { value: 'app', label: 'New Application', hint: 'Next.js, Keystone, Native, etc.' },
            { value: 'feature', label: 'Shared Package / Feature', hint: 'UI Kit, Utils, Infra, etc.' }
        ]
    });

    if (action === 'app') {
        await create();
    } else if (action === 'feature') {
        await addFeature();
    }
}
