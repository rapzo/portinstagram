module.exports = function (env) {
  return new require('knex')(require('../../config/knexfile')[env])
}
