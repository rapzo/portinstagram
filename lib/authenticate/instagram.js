var InstagramStrategy = require('passport-instagram').Strategy;
var _ = require('lodash');
var keys = require('config/keys').instagram;


if (process.ENV == 'development') {
  keys['callbackURL'] = 'http://localhost:1337/login/cb'
}

module.exports = function (passport) {
  passport.use(new InstagramStrategy(
    keys,
    function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ instagramId: profile.id }, function (err, user) {
      return done(err, user);
    }
  ));
};
