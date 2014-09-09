var router = require('express').Router();
var db = require('lib/database')(process.ENV || 'development');
var passport = require('passport');
var User = require('models/user')


/* GET home page. */
router.get('/', function (req, res) {
  res.render('pages/index', { title: res.app.get('title') });
});

module.exports = router;
