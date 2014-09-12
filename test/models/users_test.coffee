expect = require('chai').expect
pass = require 'pwd'
User = require 'models/user'

dude = {
  'name': 'John Doe',
  'email': 'john@does.com',
  'username': 'john_doe',
  'provider': 'test',
  'provider_id': 1
};


describe 'Users Model', ->
  it 'should hash the password', (done) ->
    user = new User({ name: 'dummy', email: 'r@p.c' })

    user.hash('coco', (err, u) ->
      pass.hash('coco', user.get('password_salt'), (err, hash) ->
        expect(user.get('password_hash')).to.be.equal(hash)
        done()
      )
    )

  it 'should find or create a sucker', (done) ->
    User.findOrCreate(dude, (err, user) ->
      expect(err).to.be.null;
      expect(user.get('id')).to.be.equal(1)
      done()
    )

