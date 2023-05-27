const express = require('express');
const router = express.Router();
const ECCController = require('../controllers/ECCController');

const multer = require('multer');
const upload = multer();

router.route('/ECC').post(upload.any(), ECCController.encrypt);

module.exports = router;