const Blowfish = require('egoroof-blowfish');
const { Worker } = require('worker_threads');

//tryby: ECB, CBC
module.exports.encrypt = async (req, res) => {
  let result = await new Promise((resolve, reject) => {
    const worker = new Worker('./workers/BlowfishWorker.js', {
      workerData: {
        file: req.files[0].buffer,
        type: req.body.type,
      }
    })

    worker.once('message', (data) => {
      resolve(data);
    })
  })

  res.send({
    alg: 'Blowfish',
    type: req.body.type,
    encTime: result.encTime,
    decTime: result.decTime,
    totalTime: result.totalTime,
    fileSize: Buffer.byteLength(req.files[0].buffer),
  });
};
