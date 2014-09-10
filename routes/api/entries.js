var express = require('express');
var router = express.Router();
var db = require("lib/database")(process.ENV || 'development')


/* GET entry details */
router.get('/:id/', function(req, res) {
  db.select('*').from('entries')
    .where("id", req.params.id)
    .exec(function(err, entry){
    res.send(entry);
   });
});


/* GET entry list */
router.get('/', function(req, res) {
  
  db.select('id').from('entries')
    .exec(function(err, entry){
    res.send(entry);
   });
});



module.exports = router;
