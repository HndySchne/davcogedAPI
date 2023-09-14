// importation de l'objet user du model
const bcrypt = require('bcrypt');
const User = require('../models/user');
// import de jsonwebtoken pour créer des tokens 
const jwt = require('jsonwebtoken');

// LOGIN
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            // si le user est vide en retour de findOne() on positionne une erreur 
            if (!user) {
                return res.status(401).json({ message: 'le couple mot de passe / email est erroné' });
            }
            // utilisation de bcrypt compare pour comparer les mdp hashés
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    // si le mot de passe est invalide on positionne une erreur 
                    if (!valid) {
                        return res.status(401).json({ message: 'mot de passe invalide' });
                    }
                    
                    // sinon on retourne le token avec jwt 
                    res.status(201).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.AUTH,
                            { expiresIn: '24h' }
                        )
                    })
                })


                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// CRÉATION DE MOT DE PASSE (un seul via postman à mettre en commentaire après)
// exports.signup = (req, res, next) => {
//     // fonction de crytage de mot de passe avec hash et bcrypt
//     bcrypt.hash(req.body.password, 10)
//         .then(hash => {
//             const user = User({
//                 email: req.body.email,
//                 password: hash
//             });
//             user.save()
//                 .then(() => res.status(201).json({ message: 'utilisateur créé !' }))
//                 .catch(error => res.status(400).json({ error }));
//         })
//         .catch(error => res.status(500).json({ error }));
// };