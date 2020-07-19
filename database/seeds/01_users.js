const bcrypt = require('bcrypt');

exports.seed = function (knex) {
  return knex('user')
    .del()
    .then(async function () {
      return knex('user').insert([
        {
          username: 'admin',
          name: 'System Admin',
          organization: 'Dhwani',
          designation: 'System Admin',
          password: await bcrypt.hash('admin.123', 10),
        },
      ]);
    });
};
