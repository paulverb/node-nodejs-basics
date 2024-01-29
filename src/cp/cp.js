import { spawn } from 'node:child_process';
import { argv } from 'node:process';

const spawnChildProcess = async (args) => {
  try {
    const argForChild = argv.slice(2);
    const childProc = spawn("node", ["src/cp/files/script.js", ...argForChild]);

    const stdoutPromise = new Promise((resolve) => {
      childProc.stdout.on("data", (data) => {
        console.log(`Received chunk ${data}`);
        resolve();
      });
    });

    const errorPromise = new Promise((resolve) => {
      childProc.on("error", (data) => {
        console.error(`Error in child process: ${data}`);
        resolve();
      });
    });

    await Promise.all([stdoutPromise, errorPromise]);

    process.stdin.pipe(childProc.stdin);

    console.log('Child process completed.');
  } catch (error) {
    console.error('Error in spawnChildProcess:', error);
  }
};

spawnChildProcess();

