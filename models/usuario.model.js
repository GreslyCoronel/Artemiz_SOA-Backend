const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  uid: { type: String, unique: true }, 
  firebaseUID: { type: String, required: true, unique: true }, // UID de Firebase
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  imgPerf: { type: String } // opcional, url imagen perfil
}, { collection: 'usuarios' });

module.exports = mongoose.model('Usuario', usuarioSchema);


