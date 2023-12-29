const express = require('express');
const { ProductService } = require('../../services/product.service');
const { validatorHandler } = require('../../middlewares/validator.handler');

const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('../../schemas/product.schema');

const router = express.Router();
const productService = new ProductService();

// CREATE: Agregar un nuevo producto
router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    const body = req.body;
    try {
      const newProduct = await productService.create(body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  },
);

// READ: Obtener todos los productos o los primeros según el tamaño especificado
router.get('/', async (req, res) => {
  const { size } = req.query;
  const limit = size || 10;
  const products = await productService.find(limit);
  res.status(200).json(products);
});

// READ: Obtener un producto por ID
router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const product = await productService.findOne(id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  },
);

// UPDATE: Actualizar un producto por ID
router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    try {
      const updatedProduct = await productService.update(id, body);
      res.status(200).json(updatedProduct);
    } catch (error) {
      next(error);
    }
  },
);

// DELETE: Eliminar un producto por ID
router.delete(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const deletedProduct = await productService.delete(id);
      res.status(200).json(deletedProduct);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = { router };
