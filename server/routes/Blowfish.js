const express = require('express');
const router = express.Router();
const BlowfishController = require('../controllers/BlowfishController');

const multer = require('multer');
const upload = multer();

router.route('/Blowfish').post(upload.any(), BlowfishController.encrypt);

module.exports = router;