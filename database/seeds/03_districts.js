exports.seed = function (knex) {
  return knex('district')
    .del()
    .then(async function () {
      const [uttarPradesh] = await knex
        .from('state')
        .where({ name: 'Uttar Pradesh' });
      const [bihar] = await knex.from('state').where({ name: 'Bihar' });
      return knex('district').insert([
        { name: 'Mau', state: uttarPradesh.id },
        { name: 'Varanasi', state: uttarPradesh.id },
        { name: 'Bodh Gaya', state: bihar.id },
      ]);
    });
};
