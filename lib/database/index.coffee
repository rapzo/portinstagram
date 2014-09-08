module.exports = (env) ->
  new require('knex')(require('../../config/knexfile')[env])


