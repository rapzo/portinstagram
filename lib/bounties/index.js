var router = require('express').Router();
var passport = require('passport');
var db = require("lib/database")(process.env.NODE_ENV || 'development');
var moment = require('moment');
var request = require('request');
var fs = require('fs');
var path = require('path');
var Bounty = require('models/bounty');
var User = require('models/user');
var Picture = require('models/picture');
var _ = require('lodash');



/* GET bounties page. */
router.get('/', function (req, res) {
    console.log("bounties?");
    request('http://localhost:1337/api/bounties/', function (error, response, body) {
      console.log(body);
      var bounties = JSON.parse(body);
      var user_ids = _.pluck(bounties, 'user_id');
      console.log(user_ids)

      User.query(function (qb) {
        qb.whereIn('id', user_ids)
      }).fetchAll()
        .then(function (users) {
          res.render("bounties/index", {
            title: "Bounty list",
            bounties: bounties,
            users: users.toJSON()
          });
        })
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
      pic = Picture.forge({
          name: hash + '.' + ext,
          mime_type: mimeType,
          encoding: transferEncoding,
          width: 0,
          height: 0,
          url: '/pictures/'+ hash + '.' + ext
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
        finished: 0
      }).save()
        .then(function (bounty) {

          if (pic) {
            pic.set({
              'imageable_type': 'Bounty',
              'imageable_id': bounty.id
            }).save()
            .then(function (picture) {
              db("bounties").update("file_path", picture.get("url")).where("id",bounty.id).then(function(){
                res.redirect('/bounties');
              })
              .catch(function (err) { console.log(err); });

            }).catch(function (err) { console.log(err); })
          }
          else
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
