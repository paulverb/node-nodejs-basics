import { unlink } from "node:fs/promises";
import { fromDir } from "./rename.js";

export const remove = async () => {
  try {
    const arrFoundFile = await fromDir('src', 'fileToRemove.txt', 'ppp', []);

    if (arrFoundFile.length) {
      await Promise.all(arrFoundFile.map(async (element) => {
        await unlink(element);
        console.log(`File removed: ${element}`);
      }));
    } else {
      throw new Error('No files found to remove');
    }
  } catch (err) {
    console.error('Error removing files:', err);
  }
};

await remove();
