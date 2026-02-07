import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

import {runCLI} from './helpers/run-cli.js';
import {createTempDir} from './helpers/temp-dir.js';

(async () => {
  const cwd = createTempDir();
  const projectName = 'test-template-app';
  const projectPath = path.join(cwd, projectName);

  await runCLI(
    [projectName, '--template', 'pug-scss-ts', '--no-install'],
    {cwd}
  );

  // project exists
  assert.ok(fs.existsSync(projectPath), 'Project directory was not created');

  // template-specific checks
  assert.ok(
    fs.existsSync(path.join(projectPath, 'src/views')),
    'Pug views directory missing'
  );

  assert.ok(
    fs.existsSync(path.join(projectPath, 'src/assets/styles')),
    'Styles directory missing'
  );

  // SCSS (not Less!)
  const styles = fs.readdirSync(
    path.join(projectPath, 'src/assets/styles')
  );

  assert.ok(
    styles.some(f => f.endsWith('.scss')),
    'SCSS files not found (wrong template?)'
  );

  // TypeScript
  assert.ok(
    fs.existsSync(path.join(projectPath, 'tsconfig.json')),
    'tsconfig.json not found (TS template expected)'
  );

  console.log('✅ template.test.js passed');
})();
