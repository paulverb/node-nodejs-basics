import { createReadStream, createWriteStream } from 'node:fs';
import { createGunzip } from 'node:zlib';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { pipeline } from 'node:stream/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const decompress = async () => {
  try {
    const inputFilePath = 'archive.gz'; 
    const outputFilePath = 'fileToCompress.txt';

    const compressedStream = createReadStream(inputFilePath);
    const gunzipStream = createGunzip();
    const outputStream = createWriteStream(outputFilePath);

    await pipeline(compressedStream, gunzipStream, outputStream);

    console.log('Decompression completed.');
  } catch (error) {
    console.error('Error in decompress:', error);
  }
};

await decompress();
