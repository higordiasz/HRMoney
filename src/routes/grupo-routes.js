const express = require('express');
const router = express.Router();
const grupoController = require('../controllers/grupo-controller');

router.post('/get/', grupoController.Get);

router.post('/getall/', grupoController.GetAll);

router.post('/create/', grupoController.Create);

router.post('/delete/', grupoController.Deletar);

router.post('/alterar/', grupoController.Alterar);

module.exports = router;