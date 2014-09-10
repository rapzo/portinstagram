'use strict';

exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("rewards", function(table){
      table.increments('id');
      table.string('name');

    });
};

exports.down = function(knex, Promise) {
  
};
