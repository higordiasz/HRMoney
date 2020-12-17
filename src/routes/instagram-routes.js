const express = require('express');
const router = express.Router();
const instaController = require('../controllers/instagram-controller');

router.post('/create/', instaController.Create);

router.post('/get/', instaController.Get);

router.post('/getall/', instaController.GetAll);

router.post('/delete/', instaController.Delete);

router.post('/addblock/', instaController.AddBlock);

router.post('/addchallenge/', instaController.AddChallenge);

router.post('/removeblock/', instaController.RemoverBlock);

router.post('/removechallenge/', instaController.RemoveChallenge);

router.post('/alterar/', instaController.Alterar);

router.post('/addseguir/', instaController.AddSeguir);

router.post('/addcurtir/', instaController.AddCurtir);

router.post('/resetar/', instaController.Resetar);

module.exports = router;