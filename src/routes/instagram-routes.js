const express = require('express');
const router = express.Router();
const instaController = require('../controllers/instagram-controller');

router.post('/get/', instaController.getAccount);

router.post('/getall/', instaController.getAllAccounts);

router.post('/addblock/', instaController.accountAddBlock);

router.post('/addchallenge/', instaController.accountAddChallenge);

router.post('/removeblock/', instaController.accountRemoveBlock);

router.post('/removechallenge/', instaController.accountRemoveChallenge);

router.post('/addseguir/', instaController.accountAddSeguir);

router.post('/addcurtir/', instaController.accountAddCurtir);

module.exports = router;