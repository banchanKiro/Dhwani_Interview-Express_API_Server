const Joi = require('joi');

const get = Joi.object().keys({
  id: Joi.string().guid({ version: 'uuidv4' }),
  name: Joi.string(),
  father: Joi.string(),
  mother: Joi.string(),
  district: Joi.string(),
  state: Joi.string(),
  district_id: Joi.string().guid({ version: 'uuidv4' }),
  state_id: Joi.string().guid({ version: 'uuidv4' }),
});

const post = Joi.object().keys({
  name: Joi.string().required(),
  sex: Joi.string().valid('male', 'female'),
  dob: Joi.date().timestamp(),
  father: Joi.string().required(),
  mother: Joi.string(),
  district: Joi.string().guid({ version: 'uuidv4' }).required(),
  photo: Joi.string(),
});

module.exports = {
  get,
  post,
};
