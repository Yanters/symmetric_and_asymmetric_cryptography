const Blowfish = require('egoroof-blowfish');
const { Worker } = require('worker_threads');

//tryby: ECB, CBC
module.exports.encrypt = async (req, res) => {
  let promises = []
  req.files.forEach(file => {
    promises.push(new Promise((resolve, reject) => {
      const worker = new Worker('./workers/BlowfishWorker.js', {
        workerData: {
          file: file.buffer,
          type: req.body.type,
        }
      })
  
      worker.once('message', (data) => {
        resolve(data);
      })
    }))
  });
  let result = await Promise.all(promises);
  res.send(result);
};
