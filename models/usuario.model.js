const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  firebaseUID: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: {type:String, required:true},
  imgPerf: { type: String }, 
  proveedor: { type: String, required:true}, 
  password: {type: String},
  fechaRegistro: { type: Date, default: Date.now }   
}, { collection: 'usuarios' });

module.exports = mongoose.model('Usuario', usuarioSchema);
