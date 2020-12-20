const express = require('express');
const router = express.Router();
const path = require('path')

router.get('/', (req, res, next) => {
  res.render('index', {page: 'Home', menuId: 'home'})
});

router.get('/packages', (req, res, next) => {
  res.render('packages', {page: 'Home', menuId: 'home'})
});

module.exports = router;