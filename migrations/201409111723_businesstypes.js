'use strict';

exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("business_types", function(table){
      table.increments('id');
      table.string('name');

    });
};

exports.down = function(knex, Promise) {
  
};
