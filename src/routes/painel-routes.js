const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const painelController = require('../controllers/painel-controller');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

//GET area

router.get('/cadtt/', ensureAuthenticated, (req, res, next) => {
  res.render('not', { user: req.user });
})

router.get('/tiktok/', ensureAuthenticated, (req, res, next) => {
  res.render('not', { user: req.user });
})

router.get('/movimentador/', ensureAuthenticated, painelController.loadMovimentador)

router.get('/movimentador/new', ensureAuthenticated, painelController.loadNewMovi)

router.get('/adquirir/', ensureAuthenticated, (req, res, next) => {
  res.render('not', { user: req.user });
})

router.get('/license/', ensureAuthenticated, (req, res, next) => {
  res.render('license', { user: req.user });
})

router.get('/seguidores/', ensureAuthenticated, (req, res, next) => {
  res.render('not', { user: req.user });
})

router.get('/historico/', ensureAuthenticated, painelController.loadHistory)

router.get('/painel/config', ensureAuthenticated, (req, res, next) => {
  res.render('config', { user: req.user });
})

router.get('/painel/password', ensureAuthenticated, (req, res, next) => {
  res.render('not', { user: req.user });
})

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'Desconectado');
  res.redirect('/');
});

router.get('/painel/', ensureAuthenticated, painelController.loadPanel);

router.get('/cadinsta/', ensureAuthenticated, painelController.loadCadInsta);

router.get('/download/', ensureAuthenticated, (req, res, next) => {
  res.render('download', { user: req.user });
})

router.get('/rlicense', ensureAuthenticated, (req, res, next) => {
  res.render('rlicense', { user: req.user });
})

router.get('/rinstagram', ensureAuthenticated, (req, res, next) => {
  res.render('rinstagram', { user: req.user });
})

router.get('/cadinsta/new/', ensureAuthenticated, (req, res, next) => {
  res.render('newinsta', { user: req.user, erro: "" })
});

router.get('/cadinsta/edit', ensureAuthenticated, (req, res, next) => {
  res.render('alterinsta', { user: req.user, erro: "", conta: req.query });
})

router.get('/license/comprar', ensureAuthenticated, painelController.adquirirLicense);

router.get('/cadinsta/delete', ensureAuthenticated, painelController.deleteInsta);

router.get('/instagram/', ensureAuthenticated, painelController.loadGruopInsta)

router.get('/instagram/delete', ensureAuthenticated, painelController.deleteGrupoInsta);

router.get('/instagram/new', ensureAuthenticated, painelController.loadNewGroup);

router.get('/instagram/edit', ensureAuthenticated, painelController.alterGroupInsta);

router.get('/movimentador/delete', ensureAuthenticated, painelController.deleteGrupoMovi);

router.get('/movimentador/edit', ensureAuthenticated, painelController.alterGroupMovi);

//router.get('/vendas/total', painelController.getallvalues);

// POST area

router.post('/movimentador/new', ensureAuthenticated, painelController.creatNewMovi);

router.post('/instagram/edit', ensureAuthenticated, painelController.alterGroupPost);

router.post('/movimentador/edit', ensureAuthenticated, painelController.alterGroupMoviPost);

router.post('/cadinsta/new/', ensureAuthenticated, painelController.insertInsta);

router.post('/cadinsta/edit', ensureAuthenticated, painelController.alterInsta);

router.post('/instagram/new', ensureAuthenticated, painelController.createNewGroup);

router.post('/painel/login/', userController.LoginConfig);

router.post('/painel/token/', userController.CheckToken);

router.post('/painel/create/', userController.Create);

router.post('/rlicense', ensureAuthenticated, painelController.rLicense)

router.post('/rinstagram', ensureAuthenticated, painelController.rInstagram)

router.post('/addpontosdias/dias/hrmoney/add', painelController.addPontos)

module.exports = router;