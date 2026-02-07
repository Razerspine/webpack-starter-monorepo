import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {TEMP_PREFIX} from '../constans/temp-prefix.js';

/**
 * Creates a unique temporary directory for test isolation.
 * * Logic:
 * 1. os.tmpdir() - Gets the OS-specific temp path (/tmp or AppData\Local\Temp).
 * 2. path.join() - Appends the project-specific prefix.
 * 3. fs.mkdtempSync() - Appends 6 random characters to ensure uniqueness.
 * * @returns {string} The full path to the newly created temporary directory.
 */
export function createTempDir() {
  const tempBaseDir = path.join(os.tmpdir(), TEMP_PREFIX);
  return fs.mkdtempSync(tempBaseDir);
}
