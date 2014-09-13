var TwitterStrategy = require('passport-twitter');
var keys = require('config/keys').twitter;
var User = require('models/user');

var router = require('express').Router();


if (process.env.NODE_ENV == 'development') {
  keys['callbackURL'] = 'http://127.0.0.1:1337/login/twitter/cb'
}

module.exports = function (passport) {
  passport.use(new TwitterStrategy(
    keys,
    function (accessToken, refreshToken, profile, done) {
      User.findOrCreate({
        'provider': profile.provider,
        'provider_id': profile.id,
        'username': profile.username,
        'name': profile.displayName,
        'profile_picture': profile._json.profile_image_url,
        'access_token': accessToken,
        'refresh_token': refreshToken
      }, done)
    }
  ));

  router.get(
    '/',
    passport.authenticate('twitter', { failureRedirect: '/login'}),
    function (req, res) {
      res.redirect('/');
    }
  );

  router.get(
    '/cb',
    passport.authenticate('twitter', { failureRedirect: '/login'}),
    function (req, res) {
      res.redirect('/');
    }
  );

  return router;
};

