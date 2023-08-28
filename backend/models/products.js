const mongoose = require('mongoose');
// package à utiliser pour voir les erreurs de validation mogonDB
const uniqueValidator = require('mongoose-unique-validator');

// Schéma de donnée Utilisateur 
const productItem = mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String }, 
    url: { type: String, required: true }
  });

  // Utiliser les messages d'erreurs de mongoose unique validator 
// on l'applique au schéma avant d'en faire un modèle 
productItem.plugin(uniqueValidator);

// export du model mongoose
module.exports = mongoose.model('Product', productItem); 