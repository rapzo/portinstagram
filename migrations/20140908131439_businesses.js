'use strict';

exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('businesses', function(table) {
      table.increments('id');

      table.string('name');
      
      table.integer('owner').references('users.id');
      table.integer('business_type').references('business_types.id');

      table.timestamps();
    });
};

exports.down = function(knex, Promise) {

};
