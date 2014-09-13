var router = require('express').Router();
var passport = require('passport');
var db = require("lib/database")(process.env.NODE_ENV || 'development');
var request = require('request');
var trim = require('trim');
var Bounty = require('models/bounty');

/* GET bounties page. */
router.get('/', function (req, res) {

    console.log("bounties?");
    request('http://localhost:1337/api/bounties/', function (error, response, body) {

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
    var data = {};

    console.log('pila')
    req.busboy.on('file', function (field, file, filename, transferEncoding, mimeType) {
      console.log(filename)
      file.resume();
    })
    req.busboy.on('field', function (key, value, fieldTruncated, valTruncated) {
      console.log(key, value)
      data[key] = value;
    })
    req.busboy.on('finish', function () {
      Bounty.forge({
        name: data.title,
        description: data.description,
        business_id: 1,
        target_points: 1000,
        reward_type: 1,
        hashtag: data.tag,
        start_date: data.start,
        end_date: data.end,
        finished: 0
      }).save()
        .then(function (bounty) {
          res.redirect('/bounties');
        })
        .catch(function (err) {
          console.log(err);
          res.redirect('/bounties');
        })
    })
    req.pipe(req.busboy)
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
        db.select("*").from("bounties").where("id", req.params.id).exec(function(err, rows){
            var rep = eval("(" + body + ')');
            res.render("bounties/bounty_detail", {
              bounty: rows[0],
              entries: rep,
              win: winner(rep)
            });
        });
    });
});

module.exports = router;
