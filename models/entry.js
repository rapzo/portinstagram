var Base = require('models/base')
var User = require('models/user')
var pass = require('pwd')

var Bounty = require('models/bounty')

var Entry = Base.extend({
    //instance methods
  tableName: 'entries',
  
  bounties: function(){
    return this.belongsTo(Bounty);
  }
  
  }, {
  
    //class methods
  
    getByUser: function(user_id, cb){
    
        Entry.where('user_id', user_id)
              .fetch()
              .then(function(model){ cb(null, model) })
              .catch(function(err){ cb(err, null) })
    }
  }
)


module.exports = Entry
