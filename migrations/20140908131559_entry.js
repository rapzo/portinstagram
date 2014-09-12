'use strict';

exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('entries', function(table) {
      table.increments('id');

      table.integer('user_id').references('users.id');
      table.integer('bounty_id').references('bounties.id');
      table.string('caption');
      table.integer('points');
      table.boolean('won');
      table.string('media_id');

      table.timestamps();
    });
};

exports.down = function (knex, Promise) {
  
};
