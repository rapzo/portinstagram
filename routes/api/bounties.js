var express = require('express');
var router = express.Router();
var db = require("lib/database")(process.ENV || 'development')


/* GET bounty details */
router.get('/:id/', function(req, res) {

    db.select('*').from('bounties')
    .where("id", req.params.id)
    .exec(function(err, bounty){
    res.send(bounty);
   });
  
});

/* GET bounty list */
router.get('/', function(req, res) {
  
  console.log(req.query);
  
  var query = db.select('id').from('bounties')

  if (req.query.business_id) query.where("business_id", req.query.business_id)

  if (req.query.target_points_lower) query.where("target_points", ">=",req.query.target_points_lower)
  if (req.query.target_points_upper) query.where("target_points", "<=",req.query.target_points_upper)

  if (req.query.end_date) query.where("end_date", "<=", req.query.end_date)
  if (req.query.start_date) query.where("start_date", ">=", req.query.start_date)
  
  
  if (req.query.finished == 1) query.where("finished", 1)
  else query.where("finished", 0)
  
  if (req.query.ending_first == 1) query.orderBy("end_date") //order by end_date
  else query.orderBy("updated_at", "desc") //order by recently added
  
  
  query.exec(function(err, bounty){
    res.send(bounty);
   });
  
  
});


module.exports = router;
