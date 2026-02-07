import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

import {runCLI} from './helpers/run-cli.js';
import {createTempDir} from './helpers/temp-dir.js';

(async () => {
  const cwd = createTempDir();
  const projectName = 'test-invalid-template-app';
  const projectPath = path.join(cwd, projectName);

  await runCLI(
    [projectName, '--template', 'invalid template'],
    {cwd, expectedExitCode: 1}
  );

  assert.ok(
    !fs.existsSync(projectPath),
    'CLI should fail for invalid template'
  );

  console.log('✅ invalid-template.test.js passed');
})();

