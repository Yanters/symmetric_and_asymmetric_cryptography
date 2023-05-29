const aesjs = require('aes-js');
const pbkdf2 = require('pbkdf2');

module.exports.encrypt = (req, res) => {
  console.log('start encyption');
  console.log(req.body.type);
  console.log(req.body.keySize);
  console.log(req.files[0].buffer.length);
  var iv = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];

  // get file from request
  // let file = req.files[0];

  // let bytes = file.buffer;

  // let hex = aesjs.utils.hex.fromBytes(bytes);

  if (!req.body.keySize) return res.send('error 1');

  req.files[0].buffer = aesjs.padding.pkcs7.pad(req.files[0].buffer);

  console.log(req.body.keySize);

  let key = pbkdf2.pbkdf2Sync(
    process.env.password.toString(),
    process.env.salt.toString(),
    1,
    parseInt(req.body.keySize) / 8,
    'sha512'
  );

  let aesEnc;
  let aesDec;

  switch (req.body.type) {
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

  let encryptedData = aesEnc.encrypt(req.files[0].buffer);

  // stop timer
  let encStop = process.hrtime(encStart);

  // display time in ms
  console.log(
    'Encryption time: ' + (encStop[0] * 1000 + encStop[1] / 1000000) + ' ms'
  );

  // var encryptedHex = aesjs.utils.hex.fromBytes(encrytpedBytes);

  // display first 16 characters of hex
  // console.log(hex.substr(0, 32));
  // console.log(encryptedHex.substr(0, 32));

  // console.log(encrytpedBytes);

  // return file as byte array
  let decStart = process.hrtime();

  aesDec.decrypt(encryptedData);

  let decStop = process.hrtime(decStart);

  console.log(
    'Decryption time: ' + (decStop[0] * 1000 + decStop[1] / 1000000) + ' ms'
  );
  res.set({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  });
  res.send({
    alg: 'AES',
    encTime: encStop[0] * 1000 + encStop[1] / 1000000,
    decTime: decStop[0] * 1000 + decStop[1] / 1000000,
    totalTime: (encStop[0] + decStop[0]) * 1000 + (encStop[1] + decStop[1]) / 1000000,
    type: req.body.type,
    keySize: req.body.keySize,
    fileSize: Buffer.byteLength(req.files[0].buffer),
  });
};
