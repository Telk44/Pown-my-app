const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user'); 
const path = require('path');

require('dotenv').config();


//connexion à la base de données MongoDB

mongoose.connect(`mongodb+srv://kristell:popo44@cluster0.r0vaq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

//ajout headers à notre objet response pour permettre application d'acceder à l'API et contourner le CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', userRoutes);

module.exports = app;

