import { Transform } from 'node:stream/promises';

const transform = async () => {
  try {
    const reverseTransform = new Transform({
      transform(chunk, encoding) {
        const reversedChunk = chunk.toString().split('').reverse().join('');
        this.push(reversedChunk);
      },
    });

    await process.stdin.pipe(reverseTransform).pipe(process.stdout);
  } catch (error) {
    console.error('Error in transform:', error);
  }
};

await transform();
