const express = require('express');
const router = express.Router();
const delayController = require('../controllers/delay-controller');

router.post('/get/', delayController.Get);

router.post('/getall/', delayController.GetAll);

router.post('/create/', delayController.Create);

router.post('/delete/', delayController.Delete);

router.post('/alterar/', delayController.Alterar);

module.exports = router;