var router = require('express').Router();
var current_user = require('lib/authenticate/middleware').current_user;

router.get('/', current_user, function (req, res) {
  res.render('pages/index');
});

router.get('/hof', current_user, function (req, res) {
  res.render('hof/index');
});


module.exports = router;
