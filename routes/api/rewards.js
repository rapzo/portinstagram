var express = require('express');
var router = express.Router();
var db = require("lib/database")(process.ENV || 'development')


/* GET reward list */
router.get('/', function(req, res) {

    db.select('*').from('rewards')
    .exec(function(err, reward){
    res.send(reward);
   });
  
});

module.exports = router;
