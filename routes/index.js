var express = require('express');
var router = express.Router();
var db = require("../lib/database")(process.ENV || 'development');
var util = require("util");

/* GET home page. */
router.get('/', function(req, res) {
  db.select("user_name").from("user").where({ id: 1 })
    .then(function (username) {
      console.log(username)
      res.render('index', { title: 'Exaksjhd', user: username.shift().user_name });
    })
});

module.exports = router;
