const express = require('express');
const router = express.Router();
const gratuitoController = require('../controllers/gratuito-controller');

router.post('/add/', gratuitoController.checkGratuito);

router.post('/get/', gratuitoController.GetGratuito);

module.exports = router;