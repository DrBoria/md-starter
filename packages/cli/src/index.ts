import { Command } from 'commander';
import { add } from './commands/add';
import { init } from './commands/init';
import packageJson from '../package.json';

const program = new Command();

program
    .name('md-starter')
    .version(packageJson.version)
    .description(packageJson.description);

program
    .command('init [project-name]')
    .description('Initialize a new Monorepo')
    .action(init);

program
    .command('add')
    .description('Add a new application or shared package')
    .action(add);

// Alias 'create' to 'add' for backward compatibility or just 'add app' shortcut?
// The user might use `md-starter create` to just create an app directly? 
// Let's keep `create` hidden or alias it to `add`? 
// Actually, `create` command in `create.ts` is the "Add App" logic. 
// Let's make `md-starter create` alias to `add` for now, or just `create` = `add app` direct?
// Let's just point `add` to our new `add` function.

program
    .command('create') // Hidden alias for direct app creation?
    .description('Alias for add')
    .action(add);


program.parse(process.argv);
