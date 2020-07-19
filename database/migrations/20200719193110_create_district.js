exports.up = async function (knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  return knex.schema.createTable('district', (table) => {
    table.uuid('id').primary().defaultsTo(knex.raw('uuid_generate_v4()'));
    table.string('name');
    table.unique('name');
    table.uuid('state').references('id').inTable('state');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('district');
};
