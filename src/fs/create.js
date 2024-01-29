import { open, writeFile } from 'node:fs/promises';

export const create = async () => {
  const filePath = './src/fs/files/fresh.txt';

  try {
    await open(filePath, 'wx');

    await writeFile(filePath, 'I am fresh and young');

    console.log('File created successfully');
  } catch (err) {
    if (err.code === 'EEXIST') {
      console.error('File already exists');
    } else {
      console.error('Error creating or writing to file', err);
    }
  }
};

create();
