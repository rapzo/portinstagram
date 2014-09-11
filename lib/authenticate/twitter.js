var TwitterStrategy = require('passport-twitter');
var keys = require('config/keys').twitter;

var router = require('express').Router();


if (process.env.NODE_ENV == 'development') {
  keys['callbackURL'] = 'http://127.0.0.1:1337/login/twitter/cb'
}

module.exports = function (passport) {
  passport.use(new TwitterStrategy(
    keys,
    function (token, tokenSecret, profile, done) {
      // findOrCreate user
      var user = {};

      done(null, user);
    }
  ));

  router.get(
    '/',
    passport.authenticate('twitter', { failureRedirect: '/login'}),
    function (req, res) {
      res.redirect('/');
    }
  );

  router.get('/cb', function (req, res) {
    passport.authenticate('twitter', { failureRedirect: '/login'}),
    function (req, res) {
      res.redirect('/');
    }
  });

  return router;
};

