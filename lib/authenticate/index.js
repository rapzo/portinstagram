var passport = require('passport');
var router = require('express').Router();
var User = require('models/user')
var services = ['facebook', 'instagram', 'twitter', 'google'];

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


var routes = {
  facebook: require('lib/authenticate/facebook')(passport),
  twitter: require('lib/authenticate/twitter')(passport),
  instagram: require('lib/authenticate/instagram')(passport),
  google: require('lib/authenticate/google')(passport)
};

router.get('/', function (req, res, next) {
  res.render('sessions/login', { title: 'login' });
})

services.forEach(function ( service) {
  router.get(
    '/'+ service,
    passport.authenticate(service, { failureRedirect: '/login'}),
    function (res, req) {
      res.redirect('/');
    }
  );
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
