var express = require('express');
var router = express.Router();
var db = require("../config/knexfile").development;
var util = require("util");

var db = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "./dev.sqlite3"
  }
});

/* GET home page. */
router.get('/', function(req, res) {
  console.log(util.inspect(db));
  var users = db.select("user_name").from("user").where({id:1}).exec(function(err, user){
    if(err){throw new Error(err);}
    console.log(user);
    res.render('index', { title: 'Exaksjhd', user: user[0].user_name });
  })
  
  
});

module.exports = router;
