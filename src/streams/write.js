import { createWriteStream } from 'node:fs';

const write = async () => {
  try {
    const writableStream = createWriteStream('fileToWrite.txt', { flags: 'a' }); // 'a' flag appends to the file

    await process.stdin.pipe(writableStream);

    console.log('Data written to fileToWrite.txt');
  } catch (error) {
    console.error('Error in write:', error);
  }
};

await write();
