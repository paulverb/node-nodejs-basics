import { Worker } from 'node:worker_threads';
import os from 'node:os';

const performCalculations = async () => {
  const numWorkers = os.cpus().length;
  const workers = [];

  const results = [];

  const createWorker = (data) => {
    return new Promise((resolve, reject) => {
      const worker = new Worker('./worker.js', { workerData: data });

      worker.on('message', (message) => {
        results.push(message);

        if (results.length === numWorkers) {
          console.log(results);
          resolve();
        }
      });

      worker.on('error', (error) => {
        console.error(error);
        reject(error);
      });
    });
  };

  const startCalculations = async () => {
    for (let i = 0; i < numWorkers; i++) {
      const dataToSend = 10 + i;
      workers.push(createWorker(dataToSend));
    }

    await Promise.all(workers);
  };

  await startCalculations();
};

await performCalculations();
