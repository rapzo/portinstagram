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
  
    var buses = db.select("*").from("business").exec(function(err, bus){
    if(err){throw new Error(err);}
    console.log(bus);
   
    res.render('bus_list', { title: 'Business List', buses: bus });
  })
    
  
});

module.exports = router;
