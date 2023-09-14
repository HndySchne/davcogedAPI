const mongoose = require('mongoose');
// package à utiliser pour voir les erreurs de validation mogonDB
const uniqueValidator = require('mongoose-unique-validator');

// Schéma de donnée Utilisateur 
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}); 

// Utiliser les messages d'erreurs de mongoose unique validator 
// on l'applique au schéma avant d'en faire un modèle 
userSchema.plugin(uniqueValidator);

// export du model mongoose
module.exports = mongoose.model('User', userSchema); 