var express = require('express');
var router = express.Router();
var db = require("lib/database")(process.ENV || 'development')


/* GET businesses list */
router.get('/', function(req, res) {

    db.select('id').from('businesses')
    .exec(function(err, business){
    res.send(business);
   });
  
});

/* GET business by id */
router.get('/:id/', function(req, res) {

    db.select('*').from('businesses')
    .where("id", req.params.id)
    .exec(function(err, business){
    res.send(business);
   });
  
});

/* GET businesses filtered by type */
router.get('/type/:type_id/', function(req, res) {

    db.select('*').from('businesses')
    .where("business_type", req.params.type_id)
    .exec(function(err, business){
    res.send(business);
   });
  
});

module.exports = router;
