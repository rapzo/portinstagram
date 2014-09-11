'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.table('users', function (table) {
    table.string('provider');
    table.integer('provider_id').index();
    table.string('username');
    table.string('first_name');
    table.string('last_name');
    table.string('profile_picture');
    table.string('access_token');
  });
};

exports.down = function(knex, Promise) {
  
};
