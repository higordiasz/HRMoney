const express = require('express');
const router = express.Router();
const linkController = require('../controllers/link-controller');

router.get('/', linkController.getLink);

router.post('/alterar', linkController.alterarLink);

module.exports = router;