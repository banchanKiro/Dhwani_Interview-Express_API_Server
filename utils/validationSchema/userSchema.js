const Joi = require('joi');

const get = Joi.object().keys({
  id: Joi.string().guid({ version: 'uuidv4' }),
  username: Joi.string(),
  name: Joi.string(),
  organization: Joi.string(),
  designation: Joi.string(),
});

const post = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
  name: Joi.string(),
  organization: Joi.string(),
  designation: Joi.string(),
});

const login = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = {
  get,
  post,
  login,
};
