import {Command} from 'commander';
import inquirer from 'inquirer';
import {templates, TemplateKey} from './templates';

type CliOptions = {
    template?: TemplateKey;
    install?: boolean;
    dryRun?: boolean;
};

export async function getCliContext(): Promise<{
    projectName: string;
    template: TemplateKey;
    noInstall: boolean;
    dryRun: boolean;
}> {
    const program = new Command();

    program
        .argument('[project-name]', 'Project name', 'my-app')
        .option('-t, --template <template>', 'Template name')
        .option('--no-install', 'Skip npm install')
        .option('--dry-run', 'Do not write files');

    program.parse(process.argv);

    const projectName = program.args[0];
    const options = program.opts<CliOptions>();

    let template = options.template;

    if (!template) {
        const answer = await inquirer.prompt<{ template: TemplateKey }>([
            {
                type: 'list',
                name: 'template',
                message: 'Choose a template:',
                choices: Object.entries(templates).map(([key, value]) => ({
                    name: value.description,
                    value: key
                }))
            }
        ] as any);

        template = answer.template;
    }

    if (!templates[template]) {
        throw new Error(`Unknown template: ${template}`);
    }

    return {
        projectName,
        template,
        noInstall: options.install === false,
        dryRun: Boolean(options.dryRun)
    };
}
