var Base = require('models/base')
var pass = require('pwd')


var Bounty = Base.extend({
    //instance methods
  tableName: 'bounties',
  
  entries: function(){
    return this.hasMany(Entry)
  }
  
  }, {
  
    //class methods
  
    getByUser: function(user_id, cb){
    
        Bounty.where('user_id', user_id)
              .fetch()
              .then(function(model){ cb(null, model) })
              .catch(function(err){ cb(err, null) })
    }
  }
)


module.exports = Bounty
