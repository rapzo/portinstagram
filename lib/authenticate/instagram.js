var InstagramStrategy = require('passport-instagram').Strategy;
var _ = require('lodash');
var keys = require('config/keys').instagram;


if (process.env.NODE_ENV == 'development') {
  keys['callbackURL'] = 'http://127.0.0.1:1337/login/cb'
}

module.exports = function (passport) {
  passport.use(new InstagramStrategy(
    keys,
    function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ instagramId: profile.id }, function (err, user) {
      return done(null, user);
    }
  ));
};
