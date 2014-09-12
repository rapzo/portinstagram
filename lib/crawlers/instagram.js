
var api_config = require("config/keys").instagram;
var api = require('instagram-node').instagram();
var db = require("lib/database")(process.ENV || 'development')
var async = require('async');
var _ = require("lodash");

var counter_dict = {}

var word_freq = {}

//TODO
//this is supposed to be the tag with the name of the application, like:
//var main_tag = "portinstagram"
//for testing we will use "420" as the main tag
//this way we get some dummy results
var main_tag = '420';


var populate_entries = function (err, medias, pagination, remaining, limit, bounty){
    //console.log(medias);
    console.log("error:" + err);
    console.log(bounty.hashtag);
    console.log("-----------------");
    
    medias.forEach(function(item){
        //console.log(item.images.low_resolution.url);
        
        if (~item.tags.indexOf(main_tag)){
            //populate entries table
            //if entry already exists the function terminates
            //because we have already seen the rest of the media
            console.log(item.id);
        
        }
        /*
        item.tags.forEach(function(tag){
            if (undefined !== word_freq[tag])
                word_freq[tag] += 1;
            else
                word_freq[tag] = 1;
        });
        */
    })
    
    
    counter_dict[bounty.hashtag] += 1;
    
    if (pagination.next && counter_dict[bounty.hashtag] < 4){
        console.log(counter_dict);
        pagination.next(_.partialRight(populate_entries,bounty));
    }
    
             
};



//api.use({ access_token: '1490201598.1fb234f.5e135064e8a5436e8de0478657c31aff' });
api.use({ client_id: api_config.clientID,
       client_secret: api_config.clientSecret });


db.select('*').from('bounties')
.where("finished", 0)
.then(function(bounty){

    bounty.forEach(function(item){
        console.log(item.hashtag);
        //lol race condition waiting to happen?
        counter_dict[item.hashtag] = 0;
        ////
        console.log(counter_dict);
        api.tag_media_recent(item.hashtag, _.partialRight(populate_entries,item));  
    });
 })
  
.catch(function(err){console.log(err);});



