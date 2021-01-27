const express = require('express');
const router = express.Router();
const sha1Controller = require('../controllers/sha1-controller');
const sessionController = require('../controllers/sessiongni-controller');

router.post('/get/', sessionController.getSession);

router.post('/check/', sessionController.checkUser);

router.post('/task/', sessionController.getTask);

router.post('/confirm/', sessionController.confirmarTask);

router.post('/getsha1/', sha1Controller.getSha1);

router.post('/setsha1/', sha1Controller.setSha1);

module.exports = router;