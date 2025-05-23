const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/artemizBD')
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión:', err));

const Usuario = require('./models/usuario.model');

Usuario.findOne({ firebaseUID: "Kw8h9Iu8J8cm4dc8c0nmRI2xbhs1" })
  .then(usuario => {
    if (!usuario) {
      console.log('No se encontró el usuario');
    } else {
      console.log('Usuario encontrado:', usuario);
    }
    mongoose.disconnect();
  });