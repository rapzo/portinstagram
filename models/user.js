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
    User.where({ user_name: email }).fetch()
      .then(function (user) {
        cb(null, user);
      }).catch(function (err) {
        cb(err, null);
      })
  }
})

module.exports = User
