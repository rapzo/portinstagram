'use strict';

exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("bounties", function(table) {
      table.increments('id');

      table.string("description");
      table.integer('business_id').references('businesses.id');
      table.integer("target_points");
      table.integer('reward_type').references('rewards.id');
      table.string('hashtag');
      
      
      table.date("start_date");
      table.date("end_date");
      
      table.boolean("finished");
      
      table.string("name");
      
      table.timestamps();
      
      table.string("file_path");
    });
};

exports.down = function(knex, Promise) {

};
