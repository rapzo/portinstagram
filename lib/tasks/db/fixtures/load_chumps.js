var User = require('models/user');
var Promise = require('bluebird');
var async = require('async');

var dudes = [
  { name: 'John Doe', email: 'john@does.com' },
  { name: 'Jane Doe', email: 'jane@does.com' },
  { name: 'Joan Doe', email: 'joan@does.com' },
  { name: 'Bill Doe', email: 'bill@does.com' }
];

/**
 * I def don't know how to operate promises...
 *
Promise.map(dudes, function (dude) {
  return new User().save(dude)
    .then(model)
    .catch(err);
}).then(function (model) {
  console.log(model.id +' saved');
}).catch(function (err) {
  console.err('this '+ err +' happened...');
});
 */

dudes.forEach(function (dude) {
  new User(dude).save().then(function (model) {
    console.log('dude #'+ model.id +': '+ model.get('name') +' added.');
  })
})
