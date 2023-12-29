const express = require('express');
const { CategoriesService } = require('../../services/category.service');
const faker = require('@faker-js/faker');

const router = express.Router();
const categoryService = new CategoriesService();

// CREATE: Agregar una nueva categoría
router.post('/', async (req, res) => {
  const { name } = req.body;
  try {
    const newCategory = await categoryService.create(
      name || faker.commerce.department(),
    );
    res.json(newCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ: Obtener todas las categorías
router.get('/', async (req, res) => {
  const allCategories = await categoryService.findAll();
  res.json(allCategories);
});

// READ: Obtener una categoría por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const category = await categoryService.findOne(id);
    res.json(category);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// UPDATE: Actualizar una categoría por ID
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedCategory = await categoryService.update(id, name);
    res.json(updatedCategory);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// DELETE: Eliminar una categoría por ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCategory = await categoryService.delete(id);
    res.json(deletedCategory);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = { router };
