var passport = require('passport');
var router = require('express').Router();
var User = require('models/user')
var services = ['facebook', 'instagram', 'twitter', 'google-plus'];

passport.serializeUser(function(user, callback) {
  console.log(user);
  callback(null, user.id);
});

passport.deserializeUser(function(id, callback) {
  User.where({
    id: id
  }).fetch().then(function(user) {
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

router.get(
  '/cb',
  passport.authenticate(
    ['twitter', 'facebook', 'instagram', 'google'],
    { failureRedirect: '/login'}
  ),
  function (req, res) {
    res.render('sessions/index', { title: res.app.get('title') });
  }
);



/* GET home page. */
router.get('/', function (req, res) {
  res.render('sessions/index', { title: res.app.get('title') });
});


module.exports = router;
