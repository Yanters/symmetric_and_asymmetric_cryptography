const crypto = require('crypto');
const eccrypto = require('eccrypto');
const { workerData, parentPort, MessageChannel, MessagePort } = require('worker_threads');

async function ECC(file){
    let keyStart = process.hrtime();
  let privateKey = eccrypto.generatePrivate();
  let publicKey = eccrypto.getPublic(privateKey);
  let keyStop = process.hrtime(keyStart);
  console.log(
    'Key generation time: ' + (keyStop[0] * 1000 + keyStop[1] / 1000000) + ' ms'
  );

  let encryptStart = process.hrtime();
  let encryptedData = await eccrypto.encrypt(publicKey, file);
  let encryptStop = process.hrtime(encryptStart);
  console.log(
    'Encryption time: ' +
      (encryptStop[0] * 1000 + encryptStop[1] / 1000000) +
      ' ms'
  );

  console.log(file);
  console.log(encryptedData);

  let decryptStart = process.hrtime();
  let decryptedData = await eccrypto.decrypt(privateKey, encryptedData);
  let decryptStop = process.hrtime(decryptStart);
  console.log(
    'Decryption time: ' +
      (decryptStop[0] * 1000 + decryptStop[1] / 1000000) +
      ' ms'
  );

  console.log(Buffer.from(file));
  console.log(decryptedData);

  return{
    encTime: encryptStop[0] * 1000 + encryptStop[1] / 1000000,
    decTime: decryptStop[0] * 1000 + decryptStop[1] / 1000000,
    keyTime: keyStop[0] * 1000 + keyStop[1] / 1000000,
    totalTime: (keyStop[0] + encryptStop[0] + decryptStop[0]) * 1000 + (keyStop[1] + encryptStop[1] + decryptStop[1]) / 1000000,
  }
}

// parentPort.postMessage(await ECC(workerData.file))


parentPort.on('message', async (messageData) => {
    const result = await ECC(workerData.file);

    parentPort.postMessage(result);
})
