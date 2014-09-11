var express = require('express');
var router = express.Router();
var User = require('models/user');

/* GET users listing. */
router.get('/', function(req, res) {
  User.fetchAll().then(function (users) {
    res.render('users/index', { users: users.toJSON() });
  });
});

router.get('/:id', function (req, res) {
  new User({ id: req.param('id') }).fetch().then(function (user) {
    res.render('users/view', { user: user.toJSON() });
  });
});

module.exports = router;
