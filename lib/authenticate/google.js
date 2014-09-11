var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var keys = require('config/keys').google;
var router = require('express').Router();


if (process.ENV == 'development') {
  keys['callbackURL'] = 'http://localhost:1337/login/google/cb'
}

module.exports = function (passport) {
  passport.use(new GoogleStrategy(
    keys,
    function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(null, profile);
    }
  ));

  router.get(
    '/',
    passport.authenticate('google', { failureRedirect: '/login'}),
    function (req, res) {
      res.redirect('/');
    }
  );

  router.get('/cb', function (req, res) {
    passport.authenticate('google', { failureRedirect: '/login'}),
    function (req, res) {
      res.redirect('/');
    }
  });

  return router;
};
