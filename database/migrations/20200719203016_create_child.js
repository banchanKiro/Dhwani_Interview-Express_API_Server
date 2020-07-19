const e = require('express');

exports.up = async function (knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  return knex.schema.createTable('child', (table) => {
    table.uuid('id').primary().defaultsTo(knex.raw('uuid_generate_v4()'));
    table.string('name');
    table.string('sex');
    table.timestamp('dob');
    table.string('father');
    table.string('mother');
    table.uuid('district').references('id').inTable('district');
    table.string('photo');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('child');
};
