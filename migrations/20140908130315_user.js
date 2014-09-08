'use strict';

exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("users", function(table){
      table.increments('id');
      table.string('name');
      table.string('email');
      table.string('password_hash');
      table.string('password_salt');
      table.string('token');
      table.datetime('token_expired');
      table.timestamps();
    });
};

exports.down = function(knex, Promise) {
  
};
