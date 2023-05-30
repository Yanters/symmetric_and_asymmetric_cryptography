const express = require('express');
const router = express.Router();
const RSAHybridController = require('../controllers/RSAHybridController');

const multer = require('multer');
const upload = multer();

router.route('/RSAHybrid').post(upload.any(), RSAHybridController.encrypt);

module.exports = router;