const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');

router.post('/login/', userController.Login);

router.post('/create/', userController.Create);

router.post('/alterarconf/', userController.UpdateConfig);

router.post('/alterarsenha/', userController.AlterarSenha);

router.post('/recuperarsenha/', userController.RecuperarSenha);

module.exports = router;