
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


var all_users = [];

db.select('id',"provider_id").from('users')
.then(function(users){
    users.forEach(function(item){
        all_users.push(item);
    });
    
    console.log(all_users);
    
})
.catch(function(err){console.log(err);});


function get_userid_by_providerid(user_list, id, bounty, item, cb)
{
    user_list.forEach(function(user){
       
        if (user.provider_id == id)
        { 
              
            db.select("media_id").from("entries")
              .where("user_id", user.id)
              .where("media_id", item.id)
              .then(function(rows){
                console.log(rows);
                if(rows.length == 0)
                {
                    console.log("inserting");
                    cb(user.id, bounty, item);
                }
                
            });
            
            return;
        }
    });
}

var populate_entries = function (err, medias, pagination, remaining, limit, bounty){
    //console.log(medias);
    console.log("error:" + err);
    console.log(bounty.hashtag);
    console.log("-----------------");
    
    medias.forEach(function(item){
    
        if (~item.tags.indexOf(main_tag)){
            console.log(item.id);
            
            var user_id = get_userid_by_providerid(all_users,item.user.id, bounty, item,
                function(providerid, bounty, litem){
                    console.log("inserting");
                    console.log(litem);
                    
                    db("entries").insert(
                        {
                            bounty_id: bounty.id,
                            user_id: providerid,
                            caption: litem.caption.text,
                            points: litem.likes.count,
                            won: 0,
                            media_id: litem.id
                        }
                    ).then(function(){});
                    
                })
            
        }
    })
    
    
    counter_dict[bounty.hashtag] += 1;
    
    if (pagination.next && counter_dict[bounty.hashtag] < 0){
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


db.select('*').from('entries')
.where("won", 0)
.then(function(entries){

    entries.forEach(function(entry){
        if (entry.media_id.length > 10)
        {
            console.log(entry.media_id);
            api.media(entry.media_id, function(err, media, remaining, limit) {
                    console.log(media.likes.count);
                    db('entries')
                    .where("media_id", entry.media_id)
                    .update({points: media.likes.count});
                });
        }
        
    });
 })
  
.catch(function(err){console.log(err);});


