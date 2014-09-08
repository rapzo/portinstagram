expect = require('chai').expect
pass = require 'pwd'
User = require 'models/user'

describe 'Users Model', ->
  it 'should hash the password', (done) ->
    user = new User({ name: 'dummy', email: 'r@p.c' })

    user.hash('coco', (err, u) ->
      pass.hash('coco', user.get('password_salt'), (err, hash) ->
        expect(user.get('password_hash')).to.be.equal(hash)
        done()
      )
    )


