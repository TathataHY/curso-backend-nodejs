const Joi = require('joi');

const createProductSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().positive().required(),
  image: Joi.string().uri().required(),
});

const updateProductSchema = Joi.object({
  name: Joi.string(),
  price: Joi.number().positive(),
  image: Joi.string().uri(),
});

const getProductSchema = Joi.object({
  id: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
};
