const crypto = require('crypto');
const { Worker } = require('worker_threads');

module.exports.encrypt = async (req, res) => {
  let promises = []
  req.files.forEach(file => {
    promises.push(new Promise((resolve, reject) => {
      const worker = new Worker('./workers/RSAWorker.js', {
        workerData: {
          file: file.buffer,
        }
      })
  
      worker.once('message', (data) => {
        resolve(data);
      })
    }))
  })
  let result = await Promise.all(promises);
  res.send(result);
};
