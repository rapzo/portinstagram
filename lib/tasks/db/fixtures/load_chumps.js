var User = require('models/user');
var Promise = require('bluebird');

Promise.map([
  { name: 'John Doe', email: 'john@does.com' },
  { name: 'Jane Doe', email: 'jane@does.com' },
  { name: 'Joan Doe', email: 'joan@does.com' },
  { name: 'Bill Doe', email: 'bill@does.com' }
], function (data) {
  new User(data).save(function () {
    console.log('BAM!');
  });
});
