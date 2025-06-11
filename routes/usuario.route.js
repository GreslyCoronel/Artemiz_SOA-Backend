const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario.model');

// Registrar usuario o retornar si ya existe
router.post('/', async (req, res) => {
     console.log('Cuerpo recibido:', req.body); 
  try {
    const { firebaseUID, nombre, apellido, imgPerf } = req.body;

    if (!firebaseUID || !nombre || !apellido) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const existingUser = await Usuario.findOne({ firebaseUID });
    if (existingUser) {
      return res.status(200).json(existingUser);
    }

    const newUser = new Usuario({ firebaseUID, nombre, apellido, imgPerf });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener usuario por firebaseUID
router.get('/:firebaseUID', async (req, res) => {
  try {
    const { firebaseUID } = req.params;
    console.log('Buscando UID:', firebaseUID); 

    const usuario = await Usuario.findOne({ firebaseUID });

    console.log('Resultado de búsqueda:', usuario); 

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Actualizar usuario por firebaseUID
router.put('/:firebaseUID', async (req, res) => {
  try {
    const { firebaseUID } = req.params;
     const { nombre, apellido, imgPerf, direccion, telefono } = req.body;

    const usuarioActualizado = await Usuario.findOneAndUpdate(
      { firebaseUID },
      { nombre, apellido, imgPerf,  direccion, telefono },
      { new: true, runValidators: true }
    );

    if (!usuarioActualizado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado para actualizar' });
    }

    res.json(usuarioActualizado);
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});
// Eliminar usuario por firebaseUID
router.delete('/:firebaseUID', async (req, res) => {
  try {
    const { firebaseUID } = req.params;

    const usuarioEliminado = await Usuario.findOneAndDelete({ firebaseUID });

    if (!usuarioEliminado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado para eliminar' });
    }

    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});



 
module.exports = router;


