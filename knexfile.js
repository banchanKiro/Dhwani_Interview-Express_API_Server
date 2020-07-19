const path = require('path');

module.exports = {
  development: {
    client: 'pg',
    connection: {
      user: 'postgres',
      password: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'dhwani_api',
    },
    migrations: {
      directory: path.join(__dirname, 'database/migrations'),
    },
    seeds: {
      directory: path.join(__dirname, 'database/seeds'),
    },
  },
};
