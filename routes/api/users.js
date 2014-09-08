var express = require('express');
var router = express.Router();

var db =

/* GET user details */
router.get('/:id/', function(req, res) {
  console.log(req.params.id);
  
  //select * from users where id = :id
  //responder json
  
  res.send('respond with a resource');
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
