const express = require('express');
const router = express.Router();
const linkController = require('../controllers/link-controller');
const path = require('path')

router.get('/', (req, res, next) => {
  res.render('index', {page: 'Home', menuId: 'home'})
});

router.get('/packages', (req, res, next) => {
  res.render('packages', {page: 'Home', menuId: 'home'})
});

router.get('/download', async (req, res, next) => {
  try {
    let data = await linkController.getLinkInterno()
    if (data != null) {
      res.render('download', {Mega: "<a href=\"" + data.Mega + "\" class=\"borders-btn\">Download</a>", Media: "<a href=\"" + data.Media + "\" class=\"borders-btn\">Download</a>", Drive: "<a href=\"" + data.Drive + "\" class=\"borders-btn\">Download</a>"})
    } else {
      res.render('download', {Mega: "<a href=\"" + "Erro API" + "\" class=\"borders-btn\">Download</a>", Media: "<a href=\"" + "Erro API" + "\" class=\"borders-btn\">Download</a>", Drive: "<a href=\"" + "Erro API" + "\" class=\"borders-btn\">Download</a>"})
    }
  } catch {
    res.render('download', {Mega: "<a href=\"" + "Erro API" + "\" class=\"borders-btn\">Download</a>", Media: "<a href=\"" + "Erro API" + "\" class=\"borders-btn\">Download</a>", Drive: "<a href=\"" + "Erro API" + "\" class=\"borders-btn\">Download</a>"})
  }
});

module.exports = router;