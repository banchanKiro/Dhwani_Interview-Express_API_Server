const Joi = require('joi');

const get = Joi.object().keys({
  id: Joi.string().guid({ version: 'uuidv4' }),
  name: Joi.string(),
});

const post = Joi.object().keys({
  name: Joi.string().required(),
});

module.exports = {
  get,
  post,
};
