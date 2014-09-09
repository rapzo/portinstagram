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
  
  
   req.user.load('bounties').then(function(model){
        //TODO
        //esconder campos a mais que vêm do utilizador
        res.send(model)
    })
  
});

/* GET user bounty list */
router.get('/:id/bounties/won/', function(req, res) {
  
  req.user.load('bounties').then(function(model){
        //TODO
        //esconder campos a mais que vêm do utilizador
        res.send(model.toJSON())
    })
    
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
  
  //select * from users limit 100;
  //responder json
  
  res.send('respond with a resource list');
});



module.exports = router;
