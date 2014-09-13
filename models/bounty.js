var Base = require('models/base')
var Picture = require('models/picture')


var Bounty = Base.extend({
  tableName: 'bounties',

  entries: function(){
    return this.hasMany(Entry)
  },

  background: function () {
    return this.morphMany(Picture, 'imageable');
  }
},
{
  getByUser: function(user_id, cb){
    Bounty.where('user_id', user_id)
      .fetch()
      .then(function(model){ cb(null, model) })
      .catch(function(err){ cb(err, null) })
  }
})


module.exports = Bounty
