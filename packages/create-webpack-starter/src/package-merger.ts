import fs from 'fs-extra';
import path from 'path';

type PackageJson = {
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
};

export async function mergePackageJson(
    targetDir: string,
    templateDeps: PackageJson
) {
    const packageJsonPath = path.join(targetDir, 'package.json');

    if (!await fs.pathExists(packageJsonPath)) {
        throw new Error('package.json not found in generated project');
    }

    const pkg = await fs.readJson(packageJsonPath);

    pkg.dependencies = {
        ...(pkg.dependencies || {}),
        ...(templateDeps.dependencies || {})
    };

    pkg.devDependencies = {
        ...(pkg.devDependencies || {}),
        ...(templateDeps.devDependencies || {})
    };

    await fs.writeJson(packageJsonPath, pkg, {spaces: 2});
}
