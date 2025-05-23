const express = require('express');
const mongoose = require('mongoose');
const app = express();

const cors = require('cors');
app.use(cors());

// Configura conexión a MongoDB (reemplaza la URI)
mongoose.connect('mongodb://localhost:27017/artemizBD', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB conectado'))
.catch(err => console.error('Error al conectar a MongoDB:', err));

app.use(express.json()); // para parsear JSON en body

app.use((req, res, next) => {
  console.log('Middleware: req.body =>', req.body);
  next();
});

// Importa las rutas de usuarios
const usuarioRoutes = require('./routes/usuario.route');
app.use('/api/usuarios', usuarioRoutes);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
