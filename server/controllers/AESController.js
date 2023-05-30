const aesjs = require('aes-js');
const pbkdf2 = require('pbkdf2');
const crypto = require('crypto');
const { Worker } = require('worker_threads');

module.exports.encrypt = async (req, res) => {
  let result = await new Promise((resolve, reject) => {
    const worker = new Worker('./workers/AESWorker.js', {
      workerData: {
        file: req.files[0].buffer,
        type: req.body.type,
        keySize: req.body.keySize
      }
    })

    worker.once('message', (data) => {
      resolve(data);
    })
  })

  res.set({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  });
  res.send({
    alg: 'AES',
    encTime: result.encTime,
    decTime: result.decTime,
    totalTime: result.totalTime,
    type: req.body.type,
    keySize: req.body.keySize,
    fileSize: Buffer.byteLength(req.files[0].buffer),
  });
};
