'use strict';

exports.up = function(knex, Promise) {
    return knex.schema
    .createTable("bounties", function(table) {
      table.increments('id');
      table.string("description");
      table.integer('business_id').references('businesses.id');
      table.integer("target_points");
    });
};

exports.down = function(knex, Promise) {
  
};
