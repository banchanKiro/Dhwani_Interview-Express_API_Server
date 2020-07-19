const express = require('express');
const router = express.Router();
const knex = require('../../database');
const { stateSchema } = require('../../utils/validationSchema');
const { validate } = require('../../utils');

router.get('/', async (req, res) => {
  try {
    const validatedRequest = validate(req.query, stateSchema.get);
    const conditions = { ...validatedRequest };
    const states = await knex.from('state').where(conditions);
    if (states.length === 0) {
      return res
        .status(400)
        .send({ data: { status: 'notFound', message: 'No states found' } });
    }
    return res.json({ data: { status: 'ok', states } });
  } catch (error) {
    return res.status(400).send({ data: { status: 'error', error } });
  }
});

router.post('/', async (req, res) => {
  try {
    const validatedRequest = validate(req.body, stateSchema.post);
    const state = await knex('state')
      .returning(['id', 'name'])
      .insert([validatedRequest]);
    return res.json({ data: { status: 'ok', state } });
  } catch (error) {
    return res.status(400).send({ data: { status: 'error', error } });
  }
});

module.exports = router;
