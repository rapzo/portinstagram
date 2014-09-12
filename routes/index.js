var router = require('express').Router();
var passport = require('passport');
var User = require('models/user');

/* GET home page. */
router.get('/', function (req, res) {
  if (req.session.passport && req.session.passport.user) {
    new User({ id: req.session.passport.user }).fetch()
      .then(function (user) {

        res.render('pages/index', {
          title: res.app.get('title'),
          user: user.toJSON()
        });
      })
  } else {
    res.render('pages/index', {
      title: res.app.get('title')
    });
  }
});

module.exports = router;
