var router = require('express').Router();
var User = require('models/user')
var debug = require('debug')('portinstagram');

module.exports = function (passport) {

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    new User({
      id: id
    }).fetch()
      .then(function (user) {
        //debug('User %s logged in.', user.get('username'))
        if (user) done(null, user.toJSON());
        else throw new Error('User does not exist.');
      })
      .catch(function (err) {
        done(err, null);
      })
      .error(function (err) {
        console.log(err);
      })
  });


  // Hook the fag routes
  router.use('/facebook', require('lib/authenticate/facebook')(passport));
  router.use('/instagram', require('lib/authenticate/instagram')(passport));
  router.use('/twitter', require('lib/authenticate/twitter')(passport));
  router.use('/google', require('lib/authenticate/google')(passport));

  return router;
};
