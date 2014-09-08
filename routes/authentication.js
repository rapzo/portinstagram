var passport = require('passport');
var LocalStragety = require('passport-local');
var Twitter = require('passport-twitter');
var Facebook = passport('passport-facebook');
var Instagram = require('passport-instagram');
var User = require('models/user');

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.find(id, 'id').exec(function (err, user) {
    done(err, user);
  });
});


passport.use(
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, function (email, password, done) {
    User.findOne({ email: email }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, {
          message: 'Unknown account: '+ email
        });
      }
      if (!user.authenticate(password)) {
        return done(null, false, {
          message: 'Invalid password.'
        });
      }
      return done(null, user);
    });
  });
);


