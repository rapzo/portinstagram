
var api_config = require("config/keys").instagram;
var api = require('instagram-node').instagram();
var db = require("lib/database")(process.ENV || 'development')
var async = require('async');
var _ = require("lodash");

var counter = 0;

var counter_dict = {}

var get_tags = function (err, medias, pagination, remaining, limit, hashtag){
    //console.log(medias);
    console.log("error:" + err);
    console.log(hashtag);
    console.log("-----------------");
    medias.forEach(function(item){
        console.log(item.images.low_resolution.url);
    })
    
    console.log("length: " + medias.length);
    
    console.log("-----------------");
    console.log("hash: " + counter_dict[hashtag]);
    counter_dict[hashtag] += 1;
    if (pagination.next && counter_dict[hashtag] < 4){
        console.log(counter_dict);
        pagination.next(_.partialRight(get_tags,hashtag));
    }
             
};


var main_tag = "psoc";


//api.use({ access_token: '1490201598.1fb234f.5e135064e8a5436e8de0478657c31aff' });
api.use({ client_id: api_config.clientID,
       client_secret: api_config.clientSecret });


var hashtags = db.select('hashtag').from('bounties')
               .then(function(bounty){
               
                    bounty.forEach(function(item){
                        console.log(item.hashtag);
                        //lol race condition waiting to happen
                        counter_dict[item.hashtag] = 0;
                        ////
                        console.log(counter_dict);
                        api.tag_media_recent(item.hashtag, _.partialRight(get_tags,item.hashtag));  
                    });
                 })
                  
                .catch(function(err){console.log(err);});

//api.tag_media_recent(main_tag, get_tags);
//counter = 0;

//api.tag_media_recent(, get_tags);

