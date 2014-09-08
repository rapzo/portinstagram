var router = require('express').Router();
var db = require('lib/database')(process.ENV || 'development');
var passport = require('passport');
var User = require('models/user')


/* GET home page. */
router.get('/', function(req, res) {
  User.authenticate('rabo', 'coiso', function (model) {
    console.log(model.get('user_name'))
  })
  db.select("user_name").from("user").where({ id: 1 })
    .then(function (username) {
      res.render('index', { title: 'Exaksjhd', user: username.shift().user_name });
    })
});

module.exports = router;
