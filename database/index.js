const knex = require('knex')({
  client: 'pg',
  connection: {
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'dhwani_api',
  },
});

module.exports = knex;
