const Joi = require('joi');

const get = Joi.object().keys({
  id: Joi.string().guid({ version: 'uuidv4' }),
  name: Joi.string(),
  state: Joi.string().guid({ version: 'uuidv4' }),
});

const post = Joi.object().keys({
  name: Joi.string().required(),
  state: Joi.string().guid({ version: 'uuidv4' }).required(),
});

module.exports = {
  get,
  post,
};
