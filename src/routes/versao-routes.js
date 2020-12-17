const express = require('express');
const router = express.Router();
const versaoController = require('../controllers/versao-controller');

router.get('/', versaoController.getVersao);

module.exports = router;