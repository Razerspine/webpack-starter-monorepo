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
 * dist/index.js → packages/create-webpack-starter/dist
 * repo root = 3 levels up
 */
function getRepoRoot() {
    return path.resolve(__dirname, '../../../');
}

async function run() {
    const spinner = ora();

    try {
        const {
            projectName,
            template: templateKey,
            noInstall,
            dryRun
        } = await getCliContext();

        const targetDir = path.resolve(process.cwd(), projectName);
        const template = templates[templateKey];

        log.info(`Creating project: ${projectName}`);
        log.info(`Template: ${templateKey}`);

        // --- Safety check
        if (!fs.existsSync(template.filesPath)) {
            throw new Error(`Template '${templateKey}' not found`);
        }

        // --- Copy template files
        if (dryRun) {
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

        // --- Merge dependencies from template.meta
        if (!dryRun && template.meta) {
            const {dependencies, devDependencies} = template.meta;

            if (
                (dependencies && Object.keys(dependencies).length > 0) ||
                (devDependencies && Object.keys(devDependencies).length > 0)
            ) {
                spinner.start('Merging template dependencies...');
                await mergePackageJson(targetDir, {
                    dependencies,
                    devDependencies
                });
                spinner.succeed('Dependencies merged');
            }
        }

        // --- Script cleanup (JS vs TS)
        if (!dryRun && template.meta?.features?.script) {
            const script = template.meta.features.script;

            const pkgPath = path.join(targetDir, 'package.json');
            const pkg = await fs.readJson(pkgPath);

            if (script === 'ts') {
                // ❌ Remove Babel for TS templates
                delete pkg.devDependencies?.['@babel/core'];
                delete pkg.devDependencies?.['@babel/preset-env'];
                delete pkg.devDependencies?.['babel-loader'];

                // ❌ Remove babel config files
                await fs.remove(path.join(targetDir, '.babelrc'));
                await fs.remove(path.join(targetDir, 'babel.config.js'));
            }

            if (script === 'js') {
                // ❌ Remove TypeScript for JS templates
                delete pkg.devDependencies?.['typescript'];
                delete pkg.devDependencies?.['ts-loader'];

                // ❌ Remove tsconfig
                await fs.remove(path.join(targetDir, 'tsconfig.json'));
            }

            await fs.writeJson(pkgPath, pkg, {spaces: 2});
        }

        // --- Install phase
        if (noInstall) {
            spinner.info('Skipping install');
        } else if (dryRun) {
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
