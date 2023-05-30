const crypto = require('crypto');
const eccrypto = require('eccrypto');
const { Worker } = require('worker_threads');

module.exports.encrypt = async (req, res) => {
  let result = await new Promise((resolve, reject) => {
    const worker = new Worker('./workers/ECCWorker.js', {
      workerData: {
        file: req.files[0].buffer,
      }
    })
    worker.postMessage('start');

    worker.once('message', (data) => {
      resolve(data);
    })
  })

  res.send({
    alg: 'ECC',
    encTime: result.encTime,
    decTime: result.decTime,
    keyTime: result.keyTime,
    totalTime: result.totalTime,
    fileSize: Buffer.byteLength(req.files[0].buffer),
  });
};
