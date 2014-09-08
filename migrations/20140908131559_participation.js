'use strict';

exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('participations', function(table) {
      table.integer('user_id').references("users.id");
      table.integer('bounty_id').references('bounties.id');
      table.string("caption");
      table.integer("points");
    });
};

exports.down = function(knex, Promise) {
  
};
