const { exec } = require('child_process');

/**
 * Execute simple shell command (async wrapper).
 * @param {String} cmd
 * @return {Object} { stdout: String, stderr: String }
 */
const shell = (cmd) => {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        return reject(err);
      }
      return resolve({ stdout, stderr });
    });
  });
}

const main = async () => {
  try {
    let { stdout } = await shell('truffle deploy --network rinkeby --reset');
    for (let line of stdout.split('\n')) {
      console.log(`ls: ${line}`);
    }
  } catch (e) {
    console.error(e);
  }
}

main();
