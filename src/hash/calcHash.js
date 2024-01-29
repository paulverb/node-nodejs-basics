import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'node:path';

export const calculateHash = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  try {
    const data = await readFile(path.join(__dirname, 'files', 'fileToCalculateHashFor.txt'));

    const hash = createHash('sha256').update(data).digest('hex');

    console.log('hex', hash);

    return hash;
  } catch (err) {
    console.error('Error reading the file:', err);
    throw err;
  }
};

await calculateHash();
