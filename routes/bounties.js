var router = require('express').Router();
var passport = require('passport');
var db = require("lib/database")(process.env.NODE_ENV || 'development');
var request = require('request');


/* GET bounties page. */
router.get('/', function (req, res) {

    console.log("bounties?");
    request('http://psoc.12feettall.com/api/bounties/', function (error, response, body) {
        console.log(response);
        console.log(error);
        
        res.render("bounties/index", {
          title: "Bounty list",
          bounties: eval("(" + body + ')')
        });
    });
});


router.get('/:id', function (req, res) {

    console.log("bounties?");
    request('http://psoc.12feettall.com/api/bounties/'+req.params.id+'/entries/', function (error, response, body) {
        
        function winner(bod){
            var cenas = false;
            bod.forEach(function(item){
                console.log(item.won);
                
                if (item.won){
                    console.log(item)
                    cenas = item;
                }
            });
            return cenas;
        }
        
        var rep = eval("(" + body + ')');
        console.log("winrar: "+winner(rep));
        res.render("bounties/bounty_detail", {
          title: "Entry list",
          entries: rep,
          win: winner(rep)
        });
    });
});




module.exports = router;
