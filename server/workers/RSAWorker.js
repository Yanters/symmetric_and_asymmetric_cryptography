const { workerData, parentPort } = require('worker_threads');
const crypto = require('crypto');

function RSA(file){
    console.log(Buffer.byteLength(Buffer.from(file)));
  let keyStart = process.hrtime();
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: Math.max(
      (Buffer.byteLength(Buffer.from(file)) + 42) * 8,
      2048
    ),
  });
  let keyStop = process.hrtime(keyStart);
  console.log(
    'Key generation time: ' + (keyStop[0] * 1000 + keyStop[1] / 1000000) + ' ms'
  );

  let encryptStart = process.hrtime();
  let encryptedData = crypto.publicEncrypt(publicKey, file);
  let encryptStop = process.hrtime(encryptStart);
  console.log(
    'Encryption time: ' +
      (encryptStop[0] * 1000 + encryptStop[1] / 1000000) +
      ' ms'
  );

  //   console.log(req.files[0].buffer);
  //   console.log(encryptedData);

  let decryptStart = process.hrtime();
  let decryptedData = crypto.privateDecrypt(privateKey, encryptedData);
  let decryptStop = process.hrtime(decryptStart);
  console.log(
    'Decryption time: ' +
      (decryptStop[0] * 1000 + decryptStop[1] / 1000000) +
      ' ms'
  );

  console.log(file);
  console.log(decryptedData);

  return{
    encTime: encryptStop[0] * 1000 + encryptStop[1] / 1000000,
    decTime: decryptStop[0] * 1000 + decryptStop[1] / 1000000,
    keyTime: keyStop[0] * 1000 + keyStop[1] / 1000000,
    totalTime: (keyStop[0] + encryptStop[0] + decryptStop[0]) * 1000 + (keyStop[1] + encryptStop[1] + decryptStop[1]) / 1000000,
  }
}

const result = RSA(workerData.file);

parentPort.postMessage(result)