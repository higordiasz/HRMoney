const express = require('express');
const router = express.Router();
const linkController = require('../controllers/link-controller');
const path = require('path')
const User = require('../controllers/user-controller')
const passport = require('passport');
const { forwardAuthenticated } = require('../config/auth');

function CadastrarConta(Email, Senha) {
  return User.Create3(Email, Senha)
};

router.get('/', (req, res, next) => {
  res.render('index', { page: 'Home', menuId: 'home' })
});

router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/painel',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});

router.get('/packages', (req, res, next) => {
  res.render('packages', { page: 'Home', menuId: 'home' })
});

router.get('/download', async (req, res, next) => {
  try {
    let data = await linkController.getLinkInterno()
    if (data != null) {
      res.render('download', { Mega: "<a href=\"" + data.Mega + "\" class=\"borders-btn\">Download</a>", Media: "<a href=\"" + data.Media + "\" class=\"borders-btn\">Download</a>", Drive: "<a href=\"" + data.Drive + "\" class=\"borders-btn\">Download</a>" })
    } else {
      res.render('download', { Mega: "<a href=\"" + "Erro API" + "\" class=\"borders-btn\">Download</a>", Media: "<a href=\"" + "Erro API" + "\" class=\"borders-btn\">Download</a>", Drive: "<a href=\"" + "Erro API" + "\" class=\"borders-btn\">Download</a>" })
    }
  } catch {
    res.render('download', { Mega: "<a href=\"" + "Erro API" + "\" class=\"borders-btn\">Download</a>", Media: "<a href=\"" + "Erro API" + "\" class=\"borders-btn\">Download</a>", Drive: "<a href=\"" + "Erro API" + "\" class=\"borders-btn\">Download</a>" })
  }
});

router.get('/registro', forwardAuthenticated, (req, res) => res.render('register', {Cadastro: ""}));

router.post('/registro', async (req, res, next) => {
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

module.exports = router;