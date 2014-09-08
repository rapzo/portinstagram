'use strict';

exports.up = function(knex, Promise) {
    return knex.schema
    .createTable("bounty", function(table) {
      table.increments('id');
      table.string("description");
    });
};

exports.down = function(knex, Promise) {
  
};
