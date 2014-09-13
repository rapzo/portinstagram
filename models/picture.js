var Base = require('models/base')
var pass = require('pwd')
var crypto = require('crypto')

var Bounty = Base.extend({
  tableName: 'pictures',

  imageable: function () {
    return this.morphTo('imageable', require('models/bounty'));
  }
}, {
  hashname: function (data) {
    var hash = crypto.createHash('sha1');

    data.forEach(function (seed) {
      hash.update(seed.toString());
    })

    return hash.digest('hex');
  }
})


module.exports = Bounty
