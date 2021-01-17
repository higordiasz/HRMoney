const express = require('express');
const router = express.Router();
const seguirController = require('../controllers/seguir-controller');
const seguir = require('../models/seguir');

router.post('/get/', seguirController.Get);

router.post('/getall/', seguirController.GetAll);

router.post('/add/', seguirController.AddRealizados);

router.post('/cadastrar/', seguirController.Create);

router.get('/getone/', seguirController.GetOne);

module.exports = router;