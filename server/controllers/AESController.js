const aesjs = require('aes-js');
const pbkdf2 = require('pbkdf2');
const crypto = require('crypto');
const { Worker } = require('worker_threads');

module.exports.encrypt = async (req, res) => {
  let promises = []
  req.files.forEach(file => {
    promises.push(new Promise((resolve, reject) => {
      const worker = new Worker('./workers/AESWorker.js', {
        workerData: {
          file: file.buffer,
          type: req.body.type,
          keySize: req.body.keySize
        }
      })
  
      worker.once('message', (data) => {
        resolve(data);
      })
    }))
  });
  
  let results = await Promise.all(promises);

  res.set({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  });
  res.send(results);
};
