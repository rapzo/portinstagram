'use strict';

exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("user", function(table){
      table.increments('id');
      table.string('user_name');
    });
    
};

exports.down = function(knex, Promise) {
  
};
