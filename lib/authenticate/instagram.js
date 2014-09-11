var InstagramStrategy = require('passport-instagram').Strategy;
var keys = require('config/keys').instagram;
var User = require('models/user');

var router = require('express').Router();


if (process.env.NODE_ENV == 'development') {
  keys['callbackURL'] = 'http://127.0.0.1:1337/login/instagram/cb'
}

module.exports = function (passport) {
  passport.use(new InstagramStrategy(
    keys,
    function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ instagramId: profile.id }, function (err, user) {
      User.where({ 'provider': 'instagram', 'provider_id': profile.id })
        .fetch()
        .then(function (user) {
          if (!user) {
            User
              .forge({
                'provider': profile.provider,
                'provider_id': profile.id,
                'username': profile.username,
                'name': profile._json.data.full_name,
                'profile_picture': profile._json.data.profile_picture,
                'access_token': accessToken
//                'refresh_token': refreshToken
              })
              .save()
              .then(function (user) {
                done(null, user.pick(
                  'id', 'name', 'email', 'provider', 'provider_id', 'username', 'profile_pic'
                ))
              })
              .catch(function (err) { done(err, null) })
          } else {

            user
              .set({
                'provider': profile.provider,
                'provider_id': profile.id,
                'username': profile.username,
                'name': profile._json.data.full_name,
                'profile_picture': profile._json.data.profile_picture,
                'access_token': accessToken
//                'refresh_token': refreshToken
              })
              .save()
              .then(function (user) {
                done(null, user.pick(
                  'id', 'name', 'email', 'provider', 'provider_id', 'username', 'profile_pic'
                ))
              })
              .catch(function (err) { done(err, null) })
          }
        })
        .catch(function (err) { done(err, null) })
    }
  ));

  router.get(
    '/',
    passport.authenticate('instagram', { failureRedirect: '/login'}),
    function (req, res) {
      res.redirect('/');
    }
  );

  router.get(
    '/cb',
    passport.authenticate('instagram', { failureRedirect: '/login'}),
    function (req, res) {
      res.redirect('/');
    }
  );

  return router;
};
