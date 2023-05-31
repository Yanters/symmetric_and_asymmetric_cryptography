const { workerData, parentPort } = require('worker_threads')
const aesjs = require('aes-js');
const pbkdf2 = require('pbkdf2');
const crypto = require('crypto')

function AES(file, type, keySize){
    console.log('start encyption');
  console.log(type);
  console.log(keySize);

  let iv = crypto.randomBytes(16);

  file = aesjs.padding.pkcs7.pad(file);

  console.log(keySize);

  let key = pbkdf2.pbkdf2Sync(
    process.env.password.toString(),
    //process.env.salt.toString(),
    crypto.randomBytes(16),
    1,
    parseInt(keySize) / 8,
    'sha512'
  );

  let aesEnc;
  let aesDec;

  switch (type) {
    case 'CTR':
      aesEnc = new aesjs.ModeOfOperation.ctr(key);
      aesDec = new aesjs.ModeOfOperation.ctr(key);
      break;
    case 'CBC':
      aesEnc = new aesjs.ModeOfOperation.cbc(key, iv);
      aesDec = new aesjs.ModeOfOperation.cbc(key, iv);
      break;
    case 'CFB':
      aesEnc = new aesjs.ModeOfOperation.cfb(key, iv);
      aesDec = new aesjs.ModeOfOperation.cfb(key, iv);
      break;
    case 'OFB':
      aesEnc = new aesjs.ModeOfOperation.ofb(key, iv);
      aesDec = new aesjs.ModeOfOperation.ofb(key, iv);
      break;
    case 'ECB':
      aesEnc = new aesjs.ModeOfOperation.ecb(key);
      aesDec = new aesjs.ModeOfOperation.ecb(key);
      break;
    default:
      return res.send('error 2');
  }

  // start timer
  let encStart = process.hrtime();

  let encryptedData = aesEnc.encrypt(file);

  // stop timer
  let encStop = process.hrtime(encStart);

  // display time in ms
  console.log(
    'Encryption time: ' + (encStop[0] * 1000 + encStop[1] / 1000000) + ' ms'
  );

 
  let decStart = process.hrtime();

  let decryptedData = aesDec.decrypt(encryptedData);

  let decStop = process.hrtime(decStart);

  console.log(
    'Decryption time: ' + (decStop[0] * 1000 + decStop[1] / 1000000) + ' ms'
  );

  console.log(file)
  console.log(decryptedData)

  return {
    alg: 'AES',
    encTime: encStop[0] * 1000 + encStop[1] / 1000000,
    decTime: decStop[0] * 1000 + decStop[1] / 1000000,
    totalTime: (encStop[0] + decStop[0]) * 1000 + (encStop[1] + decStop[1]) / 1000000,
    type: type,
    keySize: keySize,
    fileSize: Buffer.byteLength(file)
  }
}

const result = AES(workerData.file, workerData.type, workerData.keySize);

parentPort.postMessage(result)