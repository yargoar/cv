require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const curriculumRoutes = require('./src/routes/curriculumRoutes');

const app = express();
const PORT = process.env.API_PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Rotas
app.use('/api', curriculumRoutes);

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
