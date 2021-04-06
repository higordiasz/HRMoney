const express = require('express');
const router = express.Router();
const versaoController = require('../controllers/versao-controller');

router.get('/', versaoController.getVersao);

router.post('/', versaoController.setVersion);

module.exports = router;