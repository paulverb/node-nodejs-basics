import { createReadStream } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
  try {
    const filePath = 'fileToRead.txt'; // Adjust the file path as needed
    const readableStream = createReadStream(filePath, { encoding: 'utf8' });

    readableStream.on('data', (chunk) => {
      process.stdout.write(chunk);
    });

    readableStream.on('end', () => {
      console.log('\nRead completed.');
    });

    readableStream.on('error', (error) => {
      console.error('Error reading file:', error);
    });
  } catch (error) {
    console.error('Error in read:', error);
  }
};

await read();
