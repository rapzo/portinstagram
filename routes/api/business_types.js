var express = require('express');
var router = express.Router();
var db = require("lib/database")(process.ENV || 'development')


/* GET business_type list */
router.get('/', function(req, res) {

    db.select('*').from('business_types')
    .exec(function(err, btype){
    res.send(btype);
   });
  
});

module.exports = router;
