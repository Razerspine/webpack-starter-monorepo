import fs from 'fs-extra';

/**
 * Copy template directory into target directory.
 * Assumes targetDir does NOT exist.
 */
export async function copyTemplate(
    templatePath: string,
    targetDir: string
) {
    await fs.copy(templatePath, targetDir, {
        overwrite: true,
        errorOnExist: false
    });
}
