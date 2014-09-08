'use strict';

exports.up = function(knex, Promise) {
    return knex.schema  
    .createTable('business', function(table) {
      table.increments('id');
      table.string('business_name');
      table.integer('user_id').unsigned().references('users.id');
    });
};

exports.down = function(knex, Promise) {
  
};
