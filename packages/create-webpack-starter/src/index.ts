import path from 'path';
import { getCliContext } from './cli';
import { templates } from './templates';
import { copyTemplate } from './copier';
import { installDeps } from './installer';
import { log } from './logger';

function getRepoRoot() {
    return path.resolve(__dirname, '../../../');
}

async function run() {
    try {
        const {
            projectName,
            template,
            noInstall,
            dryRun
        } = await getCliContext();

        const targetDir = path.resolve(process.cwd(), projectName);
        const repoRoot = getRepoRoot();
        const templatePath = path.join(repoRoot, templates[template].path);

        log.info(`Creating project: ${projectName}`);
        log.info(`Template: ${template}`);

        if (dryRun) {
            log.info('[dry-run] Would copy template');
        } else {
            await copyTemplate(templatePath, targetDir);
        }

        if (!noInstall && !dryRun) {
            log.info('Installing dependencies...');
            installDeps(targetDir);
        } else {
            log.info('Skipping install');
        }

        log.success('Done!');
    } catch (err: any) {
        log.error(err.message);
        process.exit(1);
    }
}

run();
