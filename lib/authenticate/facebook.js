var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function (passport) {
  passport.use(new FacebookStrategy(
    require('config/keys').facebook,
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

