const express = require('express');
const router = express.Router();
const RSAController = require('../controllers/RSAController');

const multer = require('multer');
const upload = multer();

router.route('/RSA').post(upload.any(), RSAController.encrypt);

module.exports = router;
