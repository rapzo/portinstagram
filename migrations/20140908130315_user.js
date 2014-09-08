'use strict';

exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("users", function(table){
      table.increments('id');
      table.string('name');
      table.string('email');
    });
    
};

exports.down = function(knex, Promise) {
  
};
