#!/usr/bin/env node

import path from 'path';
import fs from 'fs-extra';
import ora from 'ora';
import inquirer from 'inquirer';

import {getCliContext} from './cli';
import {templates} from './templates';
import {copyTemplate} from './copier';
import {installDeps} from './installer';
import {log} from './logger';
import {mergePackageJson} from './package-merger';

process.on('SIGINT', () => {
    log.info('Cancelled');
    process.exit(130);
});

/**
 * Resolve repo root when running via ts-node or dist
 */
function getRepoRoot() {
    return path.resolve(__dirname, '../../..');
}

async function resolveProjectName(initial?: string) {
    if (initial) return initial;

    const {projectName} = await inquirer.prompt<{ projectName: string }>([
        {
            type: 'input',
            name: 'projectName',
            message: 'Project name:',
            validate: (v) => !!v || 'Project name is required'
        }
    ]);

    return projectName;
}

async function run() {
    const spinner = ora();

    try {
        const ctx = await getCliContext();

        const projectName = await resolveProjectName(ctx.projectName);
        const templateKey = ctx.template;

        const template = templates[templateKey];
        if (!template) {
            throw new Error(`Unknown template: ${templateKey}`);
        }

        if (!template.filesPath) {
            throw new Error(`Template '${templateKey}' has no filesPath`);
        }

        const targetDir = path.resolve(process.cwd(), projectName);

        log.info(`Creating project: ${projectName}`);
        log.info(`Template: ${templateKey}`);

        // --- Copy template
        if (ctx.dryRun) {
            spinner.info('[dry-run] Template would be copied');
        } else {
            if (fs.existsSync(targetDir)) {
                const {overwrite} = await inquirer.prompt<{ overwrite: boolean }>([
                    {
                        type: 'confirm',
                        name: 'overwrite',
                        message: `Directory "${projectName}" already exists. Overwrite?`,
                        default: false
                    }
                ]);

                if (!overwrite) {
                    log.info('Cancelled');
                    process.exit(0);
                }

                spinner.start('Cleaning target directory...');
                await fs.remove(targetDir);
                spinner.succeed('Directory cleaned');
            }

            spinner.start('Copying template...');
            await copyTemplate(template.filesPath, targetDir);
            spinner.succeed('Template copied');
        }

        // --- Merge dependencies
        if (!ctx.dryRun && template.meta) {
            const {dependencies, devDependencies} = template.meta;

            if (
                (dependencies && Object.keys(dependencies).length) ||
                (devDependencies && Object.keys(devDependencies).length)
            ) {
                spinner.start('Merging template dependencies...');
                await mergePackageJson(targetDir, {
                    dependencies,
                    devDependencies
                });
                spinner.succeed('Dependencies merged');
            }
        }

        // --- Script cleanup
        if (!ctx.dryRun && template.meta?.features?.script) {
            const pkgPath = path.join(targetDir, 'package.json');
            const pkg = await fs.readJson(pkgPath);

            if (template.meta.features.script === 'ts') {
                delete pkg.devDependencies?.['@babel/core'];
                delete pkg.devDependencies?.['@babel/preset-env'];
                delete pkg.devDependencies?.['babel-loader'];

                await fs.remove(path.join(targetDir, '.babelrc'));
                await fs.remove(path.join(targetDir, 'babel.config.js'));
            }

            if (template.meta.features.script === 'js') {
                delete pkg.devDependencies?.['typescript'];
                delete pkg.devDependencies?.['ts-loader'];

                await fs.remove(path.join(targetDir, 'tsconfig.json'));
            }

            await fs.writeJson(pkgPath, pkg, {spaces: 2});
        }

        // --- Install deps
        if (ctx.noInstall) {
            spinner.info('Skipping install');
        } else if (ctx.dryRun) {
            spinner.info('[dry-run] Would install dependencies');
        } else {
            spinner.start('Installing dependencies...');
            await installDeps(targetDir);
            spinner.succeed('Dependencies installed');
        }

        log.success('Done!');
    } catch (err: any) {
        spinner.stop();
        console.error('❌ Error:', err?.message || err);
        process.exit(1);
    }
}

run().then();
