var TwitterStrategy = require('passport-twitter');

module.exports = function (passport) {
  passport.use(new TwitterStrategy(
    require('config/keys').twitter,
    function (token, tokenSecret, profile, done) {
      // findOrCreate user
      var user = {};

      done(null, user);
    }
  ));
};

