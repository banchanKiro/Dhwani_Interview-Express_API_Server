const jwt = require('jsonwebtoken');
const knex = require('../database');

module.exports = (req, res, next) => {
  try {
    token = req.headers['authorization'];
    if (!token) {
      throw new Error('You need to be logged in to complete action');
    }
    jwt.verify(
      token,
      process.env.JWT_SECRET || 'Some Secret Key. Sssssssh',
      async function (error, decoded) {
        if (error) {
          switch (error.name) {
            case 'JsonWebTokenError':
              throw new Error(error.message);
            case 'TokenExpiredError':
              throw new Error('Session expired. Please log in again.');
            default:
              throw new Error('An error occured on verification');
          }
        } else {
          const [user] = await knex
            .select('id', 'username', 'name', 'organization', 'designation')
            .from('user')
            .where({ id: decoded.id });
          req.session = { user };
          next();
        }
      }
    );
  } catch (error) {
    return res.status(401).json({ status: 'error', message: error.message });
  }
};
