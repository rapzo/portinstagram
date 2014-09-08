var Base = require('models/base')
var pass = require('pwd')


var User = Base.extend({
  tableName: 'user',

  /**
   * Hashing passwords
   */
  hash: function (password, cb) {
    var self = this;

    pass.hash(password, function (err, salt, hash) {
      if (err) return cb(err, null);

      self.set('password_salt', salt);
      self.set('password_hash', hash);

      cb(null, self);
    });
  }

}, {
  authenticate: function (email, password, cb) {
    var user = User.where({ user_name: email }).fetch()
      .then(cb).catch(function (err) {
        console.log(err);
      })
  }
})

module.exports = User
