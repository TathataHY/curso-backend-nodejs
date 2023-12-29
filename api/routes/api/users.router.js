const express = require('express');
const { UserService } = require('../../services/user.service');

const router = express.Router();
const userService = new UserService();

// CREATE: Agregar un nuevo usuario
router.post('/', async (req, res) => {
  const { name, email, role } = req.body;
  try {
    const newUser = await userService.create(name, email, role);
    res.json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ: Obtener todos los usuarios
router.get('/', async (req, res) => {
  const allUsers = await userService.findAll();
  res.json(allUsers);
});

// READ: Obtener un usuario por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userService.findOne(parseInt(id, 10));
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// UPDATE: Actualizar un usuario por ID
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  try {
    const updatedUser = await userService.update(
      parseInt(id, 10),
      name,
      email,
      role,
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// DELETE: Eliminar un usuario por ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await userService.delete(parseInt(id, 10));
    res.json(deletedUser);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = { router };
