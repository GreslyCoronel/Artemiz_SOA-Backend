const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    direccion: { type: String, required: true },
    telefono: { type: String, required: true },
    nickName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    imgPerf: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Usuario', UsuarioSchema);

