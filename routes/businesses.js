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
  
    var buses = db.select("*").from("business").exec(function(err, user){
    if(err){throw new Error(err);}
    console.log(user);
    res.render('index', { title: 'Business List', buses: user[0].user_name });
  })
    
    res.render('index', { title: 'Business List'});
    
  
});

module.exports = router;
