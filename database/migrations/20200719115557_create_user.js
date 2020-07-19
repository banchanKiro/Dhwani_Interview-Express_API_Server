exports.up = async function (knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  return knex.schema.createTable('user', (table) => {
    table.uuid('id').primary().defaultsTo(knex.raw('uuid_generate_v4()'));
    table.string('username');
    table.string('name');
    table.string('organization');
    table.string('designation');
    table.string('password');
    table.unique('username');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('user');
};
