const express = require('express');
const router = express.Router();
const grupoController = require('../controllers/grupo-controller');

router.post('/get/instagram', grupoController.getGroupInsta);

router.post('/getall/instagram', grupoController.getAllGroupInsta);

router.post('/get/movimentador', grupoController.getGroupMovi);

router.post('/getall/movimentador', grupoController.getAllGroupMovi);

router.post('/deletealldate/', grupoController.DeleteAllGruposAndInstagram);

module.exports = router;