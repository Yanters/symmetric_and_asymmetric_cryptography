const Blowfish = require('egoroof-blowfish');
const { workerData, parentPort } = require('worker_threads');

function BlowfishFun(file, type){
  const bf = new Blowfish(process.env.blowfishKey, Blowfish.MODE.ECB);
  bf.setIv(process.env.blowfishIv);

  let encrypted;

  let encryptStart = process.hrtime();
  switch (type) {
    case 'ECB':
      encrypted = bf.encode(
        file,
        Blowfish.MODE.ECB,
        Blowfish.PADDING.NULL
      );
      break;
    case 'CBC':
      encrypted = bf.encode(
        file,
        Blowfish.MODE.CBC,
        Blowfish.PADDING.NULL
      );
      break;
    default:
      return 'error 2';
  }
  let encryptStop = process.hrtime(encryptStart);
  console.log(
    'Encryption time: ' +
      (encryptStop[0] * 1000 + encryptStop[1] / 1000000) +
      ' ms'
  );

  let decryptStart = process.hrtime();
  let decrypted = bf.decode(encrypted, Blowfish.TYPE.UINT8_ARRAY);
  let decryptStop = process.hrtime(decryptStart);
  console.log(
    'Decryption time: ' +
      (decryptStop[0] * 1000 + decryptStop[1] / 1000000) +
      ' ms'
  );

  console.log(Buffer.from(file));
  console.log(Buffer.from(decrypted));

  return {
    encTime: encryptStop[0] * 1000 + encryptStop[1] / 1000000,
    decTime: decryptStop[0] * 1000 + decryptStop[1] / 1000000,
    totalTime: (encryptStop[0] + decryptStop[0]) * 1000 + (encryptStop[1] + decryptStop[1]) / 1000000,
  }
}

const result = BlowfishFun(workerData.file, workerData.type);

parentPort.postMessage(result)