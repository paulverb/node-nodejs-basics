import { mkdir, copyFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const copy = async () => {
  const folderPath = './src/fs/';

  try {
    const files = await readdir(folderPath);

    const isFiles = files.includes('files');
    const isFiles_copy = files.includes('files_copy');

    if (isFiles_copy) {
      console.error('FS operation failed');
      return;
    }

    if (isFiles && !isFiles_copy) {
      await mkdir(join(__dirname, 'files_copy'));

      const filesInFiles = await readdir(join(__dirname, 'files'));

      for (const elem of filesInFiles) {
        await copyFile(
          join(__dirname, 'files', elem),
          join(__dirname, 'files_copy', elem)
        );
      }
    }
  } catch (err) {
    console.error('FS operation failed', err);
  }
};

copy();
