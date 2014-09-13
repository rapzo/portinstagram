var FacebookStrategy = require('passport-facebook').Strategy;
var keys = require('config/keys').facebook;
var User = require('models/user');
var router = require('express').Router();


if (process.env.NODE_ENV == 'development') {
  keys['callbackURL'] = 'http://127.0.0.1:1337/login/facebook/cb'
}

module.exports = function (passport) {
  passport.use(new FacebookStrategy(
    keys,
    function (accessToken, refreshToken, profile, done) {
      User.findOrCreate({
        'provider': profile.provider,
        'provider_id': profile.id,
        'username': profile.username,
        'name': profile._json.data.full_name,
        'profile_picture': profile._json.data.profile_picture,
        'access_token': accessToken
      }, done)
    }
  ));

  router.get(
    '/',
    passport.authenticate('facebook', { failureRedirect: '/login'}),
    function (req, res) {
      res.redirect('/');
    }
  );

  router.get('/cb', function (req, res) {
    passport.authenticate('facebook', { failureRedirect: '/login'}),
    function (req, res) {
      res.redirect('/');
    }
  });

  return router;
};

