import { Command } from 'commander';
import { create } from './commands/create';
import { init } from './commands/init';
import packageJson from '../package.json';

const program = new Command();

program
    .name('md-starter')
    .version(packageJson.version)
    .description(packageJson.description);

program
    .command('init')
    .description('Initialize a new Monorepo')
    .action(init);

program
    .command('add')
    .alias('create')
    .description('Add a new application to the Monorepo')
    .action(create);

program.parse(process.argv);
