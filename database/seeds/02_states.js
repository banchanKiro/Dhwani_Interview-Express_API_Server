exports.seed = function (knex) {
  return knex('state')
    .del()
    .then(function () {
      return knex('state').insert([
        { name: 'Uttar Pradesh' },
        { name: 'Uttarakhand' },
        { name: 'Bihar' },
      ]);
    });
};
