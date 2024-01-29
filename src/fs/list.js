import { readdir, lstat } from "node:fs/promises";
import { basename, join } from 'node:path';

export const list = async () => {
  await findDir('src', 'files', []);
};

async function findDir(startPath, nameDir, arr) {
  try {
    const files = await readdir(startPath);

    for (const file of files) {
      const filePath = join(startPath, file);
      const fileStat = await lstat(filePath);

      if (fileStat.isDirectory()) {
        if (basename(filePath) === nameDir) {
          const filesInFoundDir = await readdir(filePath);
          console.log(filesInFoundDir);
        }

        await findDir(filePath, nameDir, arr);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

await list();
