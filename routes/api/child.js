const express = require('express');
const router = express.Router();
const knex = require('../../database');
const { childSchema } = require('../../utils/validationSchema');
const { validate } = require('../../utils');

router.get('/', async (req, res) => {
  try {
    const validatedRequest = validate(req.query, childSchema.get);
    const conditions = { ...validatedRequest };

    const children = await knex.from('child_view').where(conditions);

    if (children.length === 0) {
      return res
        .status(400)
        .send({ data: { status: 'notFound', message: 'No children found' } });
    }

    return res.json({ data: { status: 'ok', children } });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ data: { status: 'error', error } });
  }
});

router.post('/', async (req, res) => {
  try {
    const validatedRequest = validate(req.body, childSchema.post);
    const child = await knex('child')
      .returning(['id', 'name', 'sex', 'dob', 'mother', 'father', 'district'])
      .insert([validatedRequest]);
    return res.json({ data: { status: 'ok', child } });
  } catch (error) {
    return res.status(400).send({ data: { status: 'error', error } });
  }
});

module.exports = router;
