import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {TEMP_PREFIX} from '../constans/temp-prefix.js';

(async () => {
  const tmpDir = os.tmpdir();
  console.log(`🧹 Starting cleanup of temporary directories in: ${tmpDir}`);

  try {
    // Read all files/folders in the system temp directory
    const files = fs.readdirSync(tmpDir);
    let deletedCount = 0;

    for (const file of files) {
      // Check if the directory name matches our project's prefix
      if (file.startsWith(TEMP_PREFIX)) {
        const fullPath = path.join(tmpDir, file);

        try {
          // recursive: true - deletes the folder and its contents
          // force: true - ignores errors if the directory is already gone
          fs.rmSync(fullPath, {recursive: true, force: true});
          deletedCount++;
          console.log(`  🗑️ Deleted: ${file}`);
        } catch (err) {
          console.error(`  ❌ Failed to delete ${file}: ${err.message}`);
        }
      }
    }

    console.log(`\n✨ Cleanup complete. Total folders deleted: ${deletedCount}`);
  } catch (err) {
    console.error(`💥 Critical error while reading tmp directory: ${err.message}`);
    process.exit(1);
  }
})();
