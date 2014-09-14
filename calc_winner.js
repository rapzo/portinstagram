
var api_config = require("config/keys").instagram;
var api = require('instagram-node').instagram();
var db = require("lib/database")(process.ENV || 'development')
var async = require('async');
var _ = require("lodash");

db.select("*").from("bounties").then(function(rows){
    console.log(rows);
    rows.forEach(function(bounty){
        
        db.select("*").from("entries").where("bounty_id", bounty.id).orderBy("points","desc").then(function(entries){
            db("entries").update("won", 1).where("id", entries[0].id).then(function(p){});
/*            entries.forEach(function(entry){
                console.log(bounty.id+" "+entry.id+" "+entry.points);
                
            });
            */
        });
    });

});
