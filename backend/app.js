// path pour aller chercher les différents fichier du js 
// utilisé pour les fichiers images sur cette application  
const path = require('path'); 
// Afin de sécuriser l'url de mongoDB on fait appel à dotenv 
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// utilisation d'express pour récupérer les données en entrée de l'API
const app = express(); 

// express.son permet de récupérer le flux d'entrée en form-data 
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/file', express.static(path.join(__dirname, 'file')));

// route des users 
const productsRoutes = require('./routes/products');
const messagesRoutes = require('./routes/messages');
const userRoutes = require('./routes/user');

// connexion à mongo DB (avec l'objet sécurisé DB_URL)
mongoose.connect(process.env.DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then()
  .catch(() => (res.status(401).json({ message: 'impossible de se connecter à la base de données' })));

// pour éviter les erreurs cors on permet le cross origin 
app.use(cors());

app.use('/api/products', productsRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/auth', userRoutes);

// on permet au fichier server d'accèder à app.js 
module.exports = app; 