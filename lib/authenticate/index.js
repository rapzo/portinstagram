var passport = require('passport');
var Router = require('express').Router;
var router = new Router();
var User = require('models/user')


passport.serializeUser(function(user, callback) {
  callback(null, user.id);
});

passport.deserializeUser(function(id, callback) {
  users.where({
    id: id
  }, function(user) {
    callback(null, user);
  });
});


var facebook = require('lib/authenticate/facebook')(passport);
var twitter = require('lib/authenticate/twitter')(passport);

router.get('/facebook', function (req, res, next) {
  res.send({ 'login': 'ok' });
});

router.get('/twitter', function (req, res, next) {
});


/* GET home page. */
router.get('/', function (req, res) {
  res.render('sessions/index', { title: res.app.get('title') });
});

router.post('/:service', function (req, res) {
  var usr = req.param('user') || {};
  User.authenticate(usr.email, usr.passwd, function (err, user) {
    res.render('sessions/index', { title: res.app.get('title'), user: user });
  })
});

module.exports = router;
