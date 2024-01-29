import { exists, lstat, readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const read = async () => {
  const findFile = async (startPath, filter) => {
    try {
      if (!(await exists(startPath))) {
        console.log("no dir ", startPath);
        return;
      }

      const files = await readdir(startPath);

      for (const file of files) {
        const filename = join(startPath, file);
        const stat = await lstat(filename);

        if (stat.isDirectory()) {
          await findFile(filename, filter);
        }

        if (filename.endsWith(filter)) {
          const data = await readFile(filename, 'utf8');
          console.log(data);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  await findFile('src', 'fileToRead.txt');
};

await read();
