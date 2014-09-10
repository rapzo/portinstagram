var TwitterStrategy = require('passport-twitter');
var keys = require('config/keys').twitter;


if (process.ENV == 'development') {
  keys['callbackURL'] = 'http://localhost:1337/'
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
};

