const express = require('express');
const router = express.Router();
const knex = require('../../database');
const { districtSchema } = require('../../utils/validationSchema');
const { validate } = require('../../utils');

router.get('/', async (req, res) => {
  try {
    const validatedRequest = validate(req.query, districtSchema.get);
    const conditions = { ...validatedRequest };
    if (validatedRequest.state) {
      const state = await knex
        .from('state')
        .where({ id: validatedRequest.state });

      if (!state) {
        return res
          .status(400)
          .send({ data: { status: 'notFound', message: 'Invalid State' } });
      }
    }

    const districts = await knex.from('district').where(conditions);

    if (districts.length === 0) {
      return res
        .status(400)
        .send({ data: { status: 'notFound', message: 'No districts found' } });
    }

    return res.json({ data: { status: 'ok', districts } });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ data: { status: 'error', error } });
  }
});

router.post('/', async (req, res) => {
  try {
    const validatedRequest = validate(req.body, districtSchema.post);
    const district = await knex('district')
      .returning(['id', 'name'])
      .insert([validatedRequest]);
    return res.json({ data: { status: 'ok', district } });
  } catch (error) {
    return res.status(400).send({ data: { status: 'error', error } });
  }
});

module.exports = router;
