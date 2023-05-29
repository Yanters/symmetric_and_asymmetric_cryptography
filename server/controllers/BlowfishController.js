const Blowfish = require('egoroof-blowfish');

//tryby: ECB, CBC
module.exports.encrypt = (req, res) => {
  const bf = new Blowfish(process.env.blowfishKey, Blowfish.MODE.ECB);
  bf.setIv(process.env.blowfishIv);

  let encrypted;

  let encryptStart = process.hrtime();
  switch (req.body.type) {
    case 'ECB':
      encrypted = bf.encode(
        req.files[0].buffer,
        Blowfish.MODE.ECB,
        Blowfish.PADDING.NULL
      );
      break;
    case 'CBC':
      encrypted = bf.encode(
        req.files[0].buffer,
        Blowfish.MODE.CBC,
        Blowfish.PADDING.NULL
      );
      break;
    default:
      return res.send('error 2');
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

  console.log(req.files[0].buffer);
  console.log(Buffer.from(decrypted));

  res.send({
    alg: 'Blowfish',
    type: req.body.type,
    encTime: encryptStop[0] * 1000 + encryptStop[1] / 1000000,
    decTime: decryptStop[0] * 1000 + decryptStop[1] / 1000000,
    totalTime: (encryptStop[0] + decryptStop[0]) * 1000 + (encryptStop[1] + decryptStop[1]) / 1000000,
    fileSize: Buffer.byteLength(req.files[0].buffer),
  });
};
