const crypto = require('crypto');

module.exports.encrypt = (req, res) => {
    console.log(Buffer.byteLength(req.files[0].buffer));
    let keyStart = process.hrtime();
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {modulusLength: Math.max((Buffer.byteLength(req.files[0].buffer)+42)*8, 2048)});
    let keyStop = process.hrtime(keyStart);
    console.log('Key generation time: ' + (keyStop[0] * 1000 + keyStop[1] / 1000000) + ' ms');

    let encryptStart = process.hrtime();
    let encryptedData = crypto.publicEncrypt(
        publicKey,
        req.files[0].buffer
    );
    let encryptStop = process.hrtime(encryptStart);
    console.log('Encryption time: ' + (encryptStop[0] * 1000 + encryptStop[1] / 1000000) + ' ms');

//   console.log(req.files[0].buffer);
//   console.log(encryptedData);

    let decryptStart = process.hrtime();
    let decryptedData = crypto.privateDecrypt(privateKey, encryptedData);
    let decryptStop = process.hrtime(decryptStart);
    console.log('Decryption time: ' + (decryptStop[0] * 1000 + decryptStop[1] / 1000000) + ' ms');

    console.log(req.files[0].buffer);
    console.log(decryptedData);

    res.send({
        alg: 'RSA',
        encTime: encryptStop[0] * 1000 + encryptStop[1] / 1000000 + ' ms',
        decTime: decryptStop[0] * 1000 + decryptStop[1] / 1000000 + ' ms',
        keyTime: keyStop[0] * 1000 + keyStop[1] / 1000000 + ' ms',
        fileSize: Buffer.byteLength(req.files[0].buffer)
    });
};
