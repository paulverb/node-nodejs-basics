import { exists, lstat, readdir, rename } from 'node:fs/promises';
import { join } from 'node:path';

export async function fromDir(startPath, filter, newNameFile, arr) {
  try {
    if (!(await exists(startPath))) {
      console.log("no dir ", startPath);
      return arr;
    }

    const files = await readdir(startPath);

    for (const file of files) {
      const filename = join(startPath, file);
      const stat = await lstat(filename);

      if (stat.isDirectory()) {
        await fromDir(filename, filter, newNameFile, arr);
      } else if (filename.endsWith(filter)) {
        arr.push(filename);
      } else if (filename.endsWith(newNameFile)) {
        throw new Error('FS operation failed');
      }
    }
    return arr;
  } catch (err) {
    console.error(err);
    return arr;
  }
}

export const rename = async () => {
  try {
    const arrFilePath = await fromDir('src', 'wrongFilename.txt', 'properFilename.md', []);

    if (arrFilePath.length === 0) {
      throw new Error('FS operation failed');
    }

    for (const filePath of arrFilePath) {
      const foundPathArr = filePath.split('/');
      foundPathArr[foundPathArr.length - 1] = 'properFilename.md';
      const newFileName = foundPathArr.join('/');

      await rename(filePath, newFileName);
      console.log('Rename complete!');
    }
  } catch (err) {
    console.error(err);
  }
};

await rename();
