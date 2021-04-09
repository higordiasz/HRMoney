const express = require('express');
const router = express.Router();
const linkController = require('../controllers/link-controller');
const path = require('path')
const User = require('../controllers/user-controller')
const passport = require('passport');
const { forwardAuthenticated } = require('../config/auth');
const painelController = require('../controllers/painel-controller');

function CadastrarConta(Email, Senha) {
  return User.Create3(Email, Senha)
};

router.get('/', forwardAuthenticated, (req, res, next) => {
  res.redirect('painel')
});

router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/painel',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});

router.get('/registro', forwardAuthenticated, (req, res) => res.render('register', {Cadastro: ""}));

router.post('/registro', forwardAuthenticated, async (req, res, next) => {
  var cadastro = await User.CreateSite(req, res);
  if (cadastro == 1) {
    res.redirect('/login')
  } else {
    if (cadastro == 3) {
      res.render('register', { Cadastro: "<p style=\"color:red\">Email ja cadastrado!</p>" })
    }
    else {
      if (cadastro == 2) {
        res.render('register', { Cadastro: "<p style=\"color:red\">Usuario ja cadastrado!</p>" })
      } else {
        res.render('register', { Cadastro: "<p style=\"color:red\">Erro ao realizar o cadastro!</p>" })
      }
    }
  }
});

router.post('/dias/api/cupom/add', painelController.addCupom)

module.exports = router;