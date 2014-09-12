var router = require('express').Router();
var User = require('models/user')

module.exports = function (passport) {

  passport.serializeUser(function(user, callback) {
    console.log(user);
    callback(null, user.id);
  });

  passport.deserializeUser(function(id, callback) {
    User.where({
      id: id
    })
      .fetch()
      .then(function (user) {
        callback(null, user);
      })
      .catch(function (err) {
        callback(err, null);
      });
  });

  // Login yo!
  router.get('/', function (req, res, next) {
    res.render('sessions/login', { title: 'login' });
  })

  // Hook the fag routes
  router.use('/facebook', require('lib/authenticate/facebook')(passport));
  router.use('/instagram', require('lib/authenticate/instagram')(passport));
  router.use('/twitter', require('lib/authenticate/twitter')(passport));
  router.use('/google', require('lib/authenticate/google')(passport));

  return router;
};
