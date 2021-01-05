const express = require('express');
const router = express.Router();
const logController = require('../controllers/log-controller');

router.post('/addlog/', logController.senderLog);

module.exports = router;