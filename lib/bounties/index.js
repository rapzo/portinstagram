var router = require('express').Router();
var passport = require('passport');
var db = require("lib/database")(process.env.NODE_ENV || 'development');
var request = require('request');
var Busboy = require('busboy');
var trim = require('trim');


/* GET bounties page. */
router.get('/', function (req, res) {

    console.log("bounties?");
    request('http://localhost:1337/api/bounties/', function (error, response, body) {
        console.log(response);
        console.log(error);
        
        res.render("bounties/index", {
          title: "Bounty list",
          bounties: eval("(" + body + ')')
        });
    });
});



router.route('/new')
  .get(function (req, res) {
    res.render('bounties/form')
  })
  .post(function (req, res) {
  
    console.log(req.body);
    
    console.log("name: "+req.body.title);
    
    db('bounties').insert(
        {
            name: req.body.title,
            description: req.body.description,
            business_id: 1,
            target_points: 1000,
            reward_type: 1,
            hashtag: req.body.tag,
            start_date: req.body.start,
            end_date: req.body.end,
            finished: 0
        }
    ).exec(function(){});
        
    res.redirect('/');
    
    
  })


router.get('/:id', function (req, res) {

    console.log("bounties?");
    request('http://localhost:1337/api/bounties/'+req.params.id+'/entries/', function (error, response, body) {
        
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
