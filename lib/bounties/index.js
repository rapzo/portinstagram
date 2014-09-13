var router = require('express').Router();
var bounty = require('models/bounty');

var request = require('request');

/* GET bounties page. */
router.get(function (req, res) {
  console.log("bounties?");
  request('http://localhost:1337/api/bounties/', function (error, response, body) {
    console.log(response);
    console.log(error);
    res.render("bounties/index", {
      title: "Portinstagram - Bounty list",
      bounties: [1,2,3]
    });
  });
})

router.route('/new')
  .get(function (req, res) {
    res.render('bounties/form')
  })
  .post(function (req, res) {
    console.log(req.busboy);
    res.redirect('/');
  })



module.exports = router;
