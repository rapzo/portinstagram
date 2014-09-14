var router = require('express').Router();
var passport = require('passport');
var db = require("lib/database")(process.env.NODE_ENV || 'development');
var moment = require('moment');
var request = require('request');
var fs = require('fs');
var path = require('path');
var Bounty = require('models/bounty');
var Picture = require('models/picture');



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
    var pic = null, data = {};

    req.busboy.on('file', function (field, file, filename, transferEncoding, mimeType) {
      console.log(filename)
      if (!filename) return file.resume();

      var ext = filename.substr(filename.lastIndexOf('.') + 1);

      var hash = Picture.hashname([filename, (new Date()).getTime()]);
      var fstream = fs.createWriteStream(
        path.join(process.env.NODE_PATH, 'public', 'pictures') + '/' + hash + '.' + ext
      );

      file.pipe(fstream);
      fstream.on('close', function () {
        Picture.forge({
          name: hash + '.' + ext,
          mime_type: mimeType,
          encoding: transferEncoding,
          width: 0,
          height: 0,
          url: '/pictures/'+ hash + '.' + ext
        }).save()
          .then(function (picture) {
            pic = picture;
          })
          .catch(function (err) {
            throw new Error(err);
          })
      });

    })
    req.busboy.on('field', function (key, value, fieldTruncated, valTruncated) {
      console.log(key, value)
      data[key] = value;
    })
    req.busboy.on('finish', function () {
      Bounty.forge({
        user_id: req.user.id,
        name: data.title,
        description: data.description,
        business_id: 1,
        target_points: 1000,
        reward_type: 1,
        hashtag: data.tag,
        start_date: data.start,
        end_date: data.end,
        finished: 0,
        user_id: req.user.id
      }).save()
        .then(function (bounty) {
          if (pic) {
            //db("bounty").update("file_path", pic.url).where("id", bounty.id).exec(function(){});
            pic.set({
              'imageable_type': 'Bounty',
              'imageable_id': bounty.id
            }).save()
            .then(function (picture) {
              res.redirect('/bounties')
            }).catch(function (err) { console.log(err); })
          }
          res.redirect('/bounties')
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
