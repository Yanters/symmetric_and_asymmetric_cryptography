const express = require('express');
const router = express.Router();
const AESController = require('../controllers/AESController');

const multer = require('multer');
const upload = multer();

router.route('/AES').post(upload.any(), AESController.encrypt);

module.exports = router;
