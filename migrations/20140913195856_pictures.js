'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('pictures', function (table) {
    table.increments('id');

    table.string('name');
    table.string('mime_type');
    table.string('encoding');
    table.integer('width');
    table.integer('height');
    table.string('url');

    table.integer('imageable_id');
    table.string('imageable_type');

    table.timestamps();
    
  });
};

exports.down = function(knex, Promise) {
  
};
