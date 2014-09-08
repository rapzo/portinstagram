var Base = require('models/base')

var User = Base.extend({
  tableName: 'users'
}, {
  authenticate: function (email, password) {
    console.log([email, password]);
  }
})

module.exports = User
