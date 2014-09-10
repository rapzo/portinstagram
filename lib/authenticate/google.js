var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var _ = require('lodash');
var keys = require('config/keys').google;


if (process.ENV == 'development') {
  keys['callbackURL'] = 'http://localhost:1337/login/cb'
}

module.exports = function (passport) {
  passport.use(new GoogleStrategy(
    keys,
    function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(null, profile);
    }
  ));
};
