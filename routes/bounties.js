var router = require('express').Router();
var passport = require('passport');
var db = require("lib/database")(process.ENV || 'development');
var request = require('request');

/* GET bounties page. */
router.get('/', function (req, res) {

    console.log("bounties?");
    request('http://localhost:1337/api/bounties/', function (error, response, body) {
        console.log(response);
        console.log(error);
        res.render("bounties/index",
                {
                 title: "Portinstagram - Bounty list",
                 bounties: [1,2,3],
                         
                }
                );
    
    });
       
            

});

module.exports = router;
