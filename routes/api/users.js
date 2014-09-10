var express = require('express');
var router = express.Router();
var User = require('models/user');
var db = require("lib/database")(process.ENV || 'development')


router.all('/:id/*', function (req, res, next) {
    console.log(req.params)
    User.getById(req.params.id, function(err, user){ 
        console.log(err, req.params.id, user)
        if (err) next(err);
        req.user = user;
        next();
    });
});
/* GET user details */
router.get('/:id/', function(req, res) {
  res.send(req.user.pick("name","email"))
});

/* GET user bounty list */
router.get('/:id/bounties/', function(req, res) {
   
   db.select('bounties.id').from('users')
    .innerJoin("entries","users.id","entries.user_id")
    .innerJoin("bounties", "entries.bounty_id", "bounties.id")
    .exec(function(err, user){
    res.send(user);
   });
   
  
});

/* GET user bounty list */
router.get('/:id/bounties/won/', function(req, res) {
  
  db.select('bounties.id').from('users')
    .innerJoin("entries","users.id","entries.user_id")
    .innerJoin("bounties", "entries.bounty_id", "bounties.id")
    .where("entries.won", true)
    .exec(function(err, user){
    res.send(user);
   });
   
   
    
});

/* GET user participation list */
router.get('/:id/entries/', function(req, res) {
  req.user.load('entries').then(function(model){
        //TODO
        //esconder campos a mais que vêm do utilizador
        res.send(model)
    })
  
});

/* GET users list */
router.get('/', function(req, res) {
  
  db.select('id').from('users')
    .exec(function(err, user){
    res.send(user);
   });
});



module.exports = router;
