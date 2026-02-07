import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

export function createTempDir() {
  return fs.mkdtempSync(
    path.join(os.tmpdir(), 'create-webpack-starter-')
  );
}
