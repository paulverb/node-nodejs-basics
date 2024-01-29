import { createReadStream, createWriteStream } from 'node:fs';
import { createGzip } from 'node:zlib';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compress = async () => {
  try {
    const inputFilePath = 'fileToCompress.txt'; 
    const outputFilePath = 'archive.gz';

    const inputStream = createReadStream(inputFilePath, { encoding: 'utf8' });
    const gzipStream = createGzip();
    const outputStream = createWriteStream(outputFilePath);

    await pipeline(inputStream, gzipStream, outputStream);

    console.log('Compression completed.');
  } catch (error) {
    console.error('Error in compress:', error);
  }
};

await compress();
