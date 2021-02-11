const express = require('express');
const router = express.Router();
const sigaController = require('../controllers/siga-controller');

router.post('/login/', sigaController.loginSiga);

router.post('/check/', sigaController.checkProfile);

router.post('/get/', sigaController.findTask);

router.post('/confirm', sigaController.confirmTask);

router.post('/pular/', sigaController.jumpTask);

router.post('/getsiga/', sigaController.GetKey);

module.exports = router;