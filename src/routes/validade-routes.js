const express = require('express');
const router = express.Router();
const validadeController = require('../controllers/validade-controller');

router.post('/get', validadeController.ReturnValidate);

module.exports = router;