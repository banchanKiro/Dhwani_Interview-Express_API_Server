const express = require('express');
const router = express.Router();
const knex = require('../../database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { userSchema } = require('../../utils/validationSchema');
const { validate } = require('../../utils');

router.get('/', async (req, res) => {
  try {
    const validatedRequest = validate(req.query, userSchema.get);
    const conditions = { ...validatedRequest };
    const users = await knex
      .from('user')
      .select(
        'id',
        'username',
        'name',
        'organization',
        'designation',
        'created_at',
        'updated_at'
      )
      .where(conditions);
    if (users.length === 0) {
      return res
        .status(400)
        .send({ data: { status: 'notFound', message: 'No users found' } });
    }
    return res.json({ data: { status: 'ok', users } });
  } catch (error) {
    return res.status(400).send({ data: { status: 'error', error } });
  }
});

router.post('/', async (req, res) => {
  try {
    const validatedRequest = validate(req.body, userSchema.post);
    const password = await bcrypt.hash(validatedRequest.password, 10);
    validatedRequest.password = password;
    const user = await knex('user')
      .returning([
        'id',
        'username',
        'name',
        'organization',
        'designation',
        'created_at',
        'updated_at',
      ])
      .insert([validatedRequest]);
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || 'Some Secret Key. Sssssssh',
      { expiresIn: 60 * 60 * 24 }
    );
    return res
      .header('Authorization', token)
      .json({ data: { status: 'ok', user } });
  } catch (error) {
    return res.status(400).send({ data: { status: 'error', error } });
  }
});

router.post('/login', async (req, res) => {
  try {
    const validatedRequest = validate(req.body, userSchema.login);
    const [user] = await knex.from('user').where({
      username: validatedRequest.username,
    });
    if (!user) {
      return res.status(400).json({
        data: { status: 'authFailed', message: 'User not found' },
      });
    }
    const match = await bcrypt.compare(
      validatedRequest.password,
      user.password
    );
    if (match) {
      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET || 'Some Secret Key. Sssssssh',
        { expiresIn: 60 * 60 * 24 }
      );
      return res
        .header('Authorization', token)
        .json({ data: { status: 'ok', user } });
    }
    return res.status(401).json({
      data: { status: 'authFailed', message: 'Incorrect Password' },
    });
  } catch (error) {
    return res.status(400).send({ data: { status: 'error', error } });
  }
});

module.exports = router;
