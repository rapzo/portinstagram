var FacebookStrategy = require('passport-facebook').Strategy;
var keys = require('config/keys').facebook;


if (process.env.NODE_ENV == 'development') {
  keys['callbackURL'] = 'http://127.0.0.1:1337/login/cb'
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
};

