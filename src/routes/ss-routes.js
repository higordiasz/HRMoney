const express = require('express');
const router = express.Router();
const ssController = require('../controllers/ss-controller');

router.post('/login/', ssController.login)

router.post('/getcontas/', ssController.getContas);

router.post('/getgrupos/', ssController.getGrupos);

router.post('/getconta/', ssController.getConta);

router.post('/getgrupo/', ssController.getGrupo);

router.post('/addconta/', ssController.addConta);

router.post('/addgrupo/', ssController.addGrupo);

router.post('/removegrupo/', ssController.removeGrupo);

router.post('/removeconta/', ssController.removeConta);

router.post('/addchallenge/', ssController.addChallenge);

router.post('/addblock/', ssController.addBlock);

router.post('/addincorrect/', ssController.addIncorrect);

router.post('/removechallenge/', ssController.removeChallenge);

router.post('/removeblock/', ssController.removeBlock);

router.post('/removeincorrect/', ssController.removeIncorrect);

router.post('/editconta/', ssController.editConta);

router.post('/editgrupo/', ssController.editGrupo);

router.post('/addseguir/', ssController.addSeguir);

router.post('/addcurtir/', ssController.addCurtir);

router.post('/addstory/', ssController.addStory);

module.exports = router;