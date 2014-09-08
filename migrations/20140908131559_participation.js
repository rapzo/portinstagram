'use strict';

exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('participation', function(table) {
      table.integer('user_id').references("users.id");
      table.integer('bounty_id').references('bounty.id');
      table.string("caption");
      table.integer("points");
    });
};

exports.down = function(knex, Promise) {
  
};
