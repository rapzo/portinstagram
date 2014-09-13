'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.table('bounties', function (table) {
    table.integer('user_id').references('users.id');
  })
};

exports.down = function(knex, Promise) {
  
};
