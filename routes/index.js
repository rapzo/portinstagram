var router = require('express').Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function (req, res) {
  res.render('pages/index', { title: res.app.get('title') });
});

module.exports = router;
