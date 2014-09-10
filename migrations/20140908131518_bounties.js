'use strict';

exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("bounties", function(table) {
      table.increments('id');

      table.string("description");
      table.integer('business_id').references('businesses.id');
      table.integer("target_points");
      
      table.date("start_date");
      table.date("end_date");
      
      table.boolean("finished");
      
      table.timestamps();
    });
};

exports.down = function(knex, Promise) {

};
