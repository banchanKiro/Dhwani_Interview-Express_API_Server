const { ValidationError } = require('../exceptions');

module.exports = (body, schema) => {
  try {
    const { value, error } = schema.validate(body);
    if (error) {
      throw new ValidationError(error.details);
    }
    return value;
  } catch (error) {
    throw error;
  }
};
