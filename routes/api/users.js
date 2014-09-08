var express = require('express');
var router = express.Router();

var db = require("lib/database")(process.ENV || 'development')

/* GET user details */
router.get('/:id/', function(req, res) {
  console.log(req.params.id);
  
  var user = db.select("*").from("users").where("id",req.params.id).exec(function(err, qset){
    if(err){throw new Error(err);}
    console.log(qset);
   
    res.send(qset);
  })
  
  //res.send('respond with a resource');
});

/* GET user bounty list */
router.get('/:id/bounties/', function(req, res) {
  console.log(req.params.id);
  
  //select bounties.* from users inner join bounties where users.id = :id;
  //responder json
  
  res.send('respond with a resource');
});

/* GET user participation list */
router.get('/:id/participation/', function(req, res) {
  console.log(req.params.id);
  
  //select bounties.* from users inner join bounties where users.id = :id;
  //responder json
  
  res.send('respond with a resource');
});

/* GET users list */
router.get('/', function(req, res) {
  
  //select * from users limit 100;
  //responder json
  
  res.send('respond with a resource list');
});



module.exports = router;
