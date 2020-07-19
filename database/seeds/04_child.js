const moment = require('moment');

exports.seed = function (knex) {
  return knex('child')
    .del()
    .then(async function () {
      const [mau] = await knex.from('district').where({ name: 'Mau' });
      const [varanasi] = await knex
        .from('district')
        .where({ name: 'Varanasi' });
      const [bodhGaya] = await knex
        .from('district')
        .where({ name: 'Bodh Gaya' });
      return knex('child').insert([
        {
          name: 'Prakash Kumar',
          sex: 'male',
          dob: moment('2001-02-01').utc().format(),
          father: 'Ram Kumar',
          mother: 'Rama Kumar',
          district: mau.id,
          photo:
            'https://staging-dhwani.s3.ap-south-1.amazonaws.com/82ac44b1c5d7ef91a9e912abca5fc3f5.jpg',
        },
        {
          name: 'Sanjay Singh',
          sex: 'male',
          dob: moment('2002-02-01').utc().format(),
          father: 'Shyam Singh',
          mother: 'Rashmi Singh',
          district: varanasi.id,
          photo:
            'https://staging-dhwani.s3.ap-south-1.amazonaws.com/82ac44b1c5d7ef91a9e912abca5fc3f5.jpg',
        },
        {
          name: 'Abhinav Chaudhary',
          sex: 'male',
          dob: moment('2003-02-01').utc().format(),
          father: 'Nilan Chaudhary',
          mother: 'Rupali Chaudhary',
          district: bodhGaya.id,
          photo:
            'https://staging-dhwani.s3.ap-south-1.amazonaws.com/82ac44b1c5d7ef91a9e912abca5fc3f5.jpg',
        },
      ]);
    });
};
