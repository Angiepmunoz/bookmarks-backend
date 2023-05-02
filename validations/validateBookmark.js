const Joi = require("joi");
const createValidator = require("./createValidator");

const bookmarkSchema = Joi.object({
  name: Joi.string().required(),
  url: Joi.string().required(),
  category: Joi.string(),
  is_favorite: Joi.boolean(),
});

module.exports = createValidator(bookmarkSchema);
