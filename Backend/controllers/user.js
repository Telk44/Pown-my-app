const User = require ('../models/User');
const bcrypt = require ('bcrypt'); 
const jwt = require('jsonwebtoken'); 
require('dotenv').config();

//création compte utilisateur
exports.signup = (req, res, next) => {
    const name = req.body.email
    console.log(name)
    bcrypt.hash(req.body.password, 10) //appel fonction de hachage de bcrypt dans mot de passe - mdp salé 10fois
      // Création d'un nouvel utilisateur et enregistrement dans la BDD
      .then(hash => {
        const user = new User({
          name: name,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
      
  };
  
  //connection compte utilisateur
  exports.login = (req, res, next) => {
    const name = req.body.name;
    User.findOne({name: name})
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });//changer le message pour qq de plus générique
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });//changer le message pour qq de plus générique
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign
              (
                { userId: user._id },
                'process.env.DB_TOKEN',
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }))
    }