var FacebookStrategy = require('passport-facebook').Strategy;
var keys = require('config/keys').facebook;

var router = require('express').Router();


if (process.env.NODE_ENV == 'development') {
  keys['callbackURL'] = 'http://127.0.0.1:1337/login/facebook/cb'
}

module.exports = function (passport) {
  passport.use(new FacebookStrategy(
    keys,
    function (accessToken, refreshToken, profile, callback) {
      users.find({
        originalId: profile.id,
        source: "facebook"
      }, function (user) {
        if (user.length !== 0) {
          callback(null, user[0]);
        } else {

        // users.create(profile, function(newUser) {
        //   callback(null, newUser);
        // });

        }
      });
    }
  ));

  router.get(
    '/',
    passport.authenticate('instagram', { failureRedirect: '/login'}),
    function (req, res) {
      res.redirect('/');
    }
  );

  router.get('/cb', function (req, res) {
    passport.authenticate('instagram', { failureRedirect: '/login'}),
    function (req, res) {
      res.redirect('/');
    }
  });

  return router;
};

