const mongoose = require('mongoose');
// package à utiliser pour voir les erreurs de validation mogonDB
const uniqueValidator = require('mongoose-unique-validator');

// Schéma de donnée Utilisateur 
const messageContact = mongoose.Schema({
    title:{ type: String }, 
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    text: { type: String, required: true }
  });

// Utiliser les messages d'erreurs de mongoose unique validator 
// on l'applique au schéma avant d'en faire un modèle 
messageContact.plugin(uniqueValidator);

// export du model mongoose
module.exports = mongoose.model('messageContact', messageContact); 