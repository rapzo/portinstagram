var FacebookStrategy = require('passport-facebook').Strategy;
var keys = require('config/keys').facebook;


if (process.ENV == 'development') {
  keys['callbackURL'] = 'http://localhost:1337/'
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

