const { workerData, parentPort } = require('worker_threads');
const crypto = require('crypto');
const aesjs = require('aes-js');
const pbkdf2 = require('pbkdf2');

function RSAHybrid(file){
    console.log(Buffer.byteLength(file));
  let keyStart = process.hrtime();
  let symKey = pbkdf2.pbkdf2Sync(
    process.env.password.toString(),
    crypto.randomBytes(16),
    1,
    256 / 8,
    'sha512'
  );
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: Math.max(
      (Buffer.byteLength(Buffer.from(symKey)) + 42) * 8,
      2048
    ),
  });
  let keyStop = process.hrtime(keyStart);
  console.log(
    'Key generation time: ' + (keyStop[0] * 1000 + keyStop[1] / 1000000) + ' ms'
  );

  let aesEnc = new aesjs.ModeOfOperation.ctr(symKey);

  let encryptStart = process.hrtime();

  let encryptedData = aesEnc.encrypt(file);
  let encryptedKey = crypto.publicEncrypt(publicKey, Buffer.from(symKey));

  let encryptStop = process.hrtime(encryptStart);
  console.log(
    'Encryption time: ' +
      (encryptStop[0] * 1000 + encryptStop[1] / 1000000) +
      ' ms'
  );

  let decryptStart = process.hrtime();

  let decryptedKey = crypto.privateDecrypt(privateKey, encryptedKey);
  let aesDec = new aesjs.ModeOfOperation.ctr(decryptedKey);
  let decryptedData = Buffer.from(aesDec.decrypt(encryptedData));

  let decryptStop = process.hrtime(decryptStart);
  console.log(
    'Decryption time: ' +
      (decryptStop[0] * 1000 + decryptStop[1] / 1000000) +
      ' ms'
  );

  console.log(Buffer.from(file));
  console.log(decryptedData);

  return{
    alg: 'RSA*',
    encTime: encryptStop[0] * 1000 + encryptStop[1] / 1000000,
    decTime: decryptStop[0] * 1000 + decryptStop[1] / 1000000,
    keyTime: keyStop[0] * 1000 + keyStop[1] / 1000000,
    totalTime: (keyStop[0] + encryptStop[0] + decryptStop[0]) * 1000 + (keyStop[1] + encryptStop[1] + decryptStop[1]) / 1000000,
    fileSize: Buffer.byteLength(file),
  }
}

const result = RSAHybrid(workerData.file);

parentPort.postMessage(result)
