const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');

//router.post('/login/', userController.Login);

//router.post('/login/', userController.LoginConfig);

router.post('/login/', userController.loginSistema);

router.post('/token/', userController.CheckToken);

router.post('/create/', userController.Create);


module.exports = router;