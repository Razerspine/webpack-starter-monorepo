import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function runCLI(args = [], options = {}) {
  // Get expectedExitCode, default 0 (success)
  const expectedExitCode = options.expectedExitCode ?? 0;

  return new Promise((resolve, reject) => {
    const cliPath = path.resolve(__dirname, '../../bin/index.js');

    const child = spawn(
      process.execPath,
      [cliPath, ...args],
      {
        cwd: options.cwd,
        stdio: 'inherit',
      }
    );

    child.on('error', reject);

    child.on('close', (code) => {
      // Compare the resulting code with the expected code
      if (code !== expectedExitCode) {
        reject(new Error(`CLI exited with code ${code} (expected: ${expectedExitCode})`));
      } else {
        resolve();
      }
    });
  });
}
