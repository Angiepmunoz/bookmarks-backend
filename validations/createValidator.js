/**
 * Accepts a Joi schema and returns a middleware function to validate the request body against the schema.
 *
 * @param {Joi Schema} schema
 * @returns {middleware}
 */
const createValidator = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};

module.exports = createValidator;
