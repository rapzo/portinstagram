var TwitterStrategy = require('passport-twitter');
var keys = require('config/keys').twitter;


if (process.env.NODE_ENV == 'development') {
  keys['callbackURL'] = 'http://127.0.0.1:1337/login/cb'
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

