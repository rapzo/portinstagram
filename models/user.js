var Base = require('models/base')
var pass = require('pwd')

var Entry = require('models/entry')
var Bounty = require('models/bounty')

var User = Base.extend({
  tableName: 'users',

  entries: function(){
      return this.hasMany(Entry);
  },

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
  },

  getById: function(id, cb) {
    User.where('id', id)
      .fetch()
      .then(function(model){ cb(null, model) })
      .catch(function(err){ cb(err, null) })
  },

  findOrCreate: function (data, cb) {
    User.where({ 'provider': data.provider, 'provider_id': data.provider_id })
      .fetch()
      .then(function (user) {
        if (!user) {
          User
            .forge(data)
            .save()
            .then(function (user) {
              cb(null, user.pick(
                'id', 'name', 'email', 'provider', 'provider_id', 'username', 'data_pic'
              ))
            })
            .catch(function (err) { cb(err, null) })
        } else {
          user
            .set(data)
            .save()
            .then(function (user) {
              cb(null, user.pick(
                'id', 'name', 'email', 'provider', 'provider_id', 'username', 'data_pic'
              ))
            })
            .catch(function (err) { cb(err, null) })
        }
      })
      .catch(function (err) { cb(err, null) })
  }
})

module.exports = User
