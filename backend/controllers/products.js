// importation de l'objet user du model
// const bcrypt = require('bcrypt');
const Product = require('../models/products');
// import de jsonwebtoken pour créer des tokens (sécurité)
const jwt = require('jsonwebtoken');
// permet de manipuler des fichiers 
const fs = require('fs');

// CREATION DU PRODUIT 
exports.productCreating = (req, res, next) => {
    // parsing des donnée en entrée pour les manipuler 
    console.log('dans la fonction de création de produit : ');
    console.log(req.body);
    const productObject = req.body; 
    console.log(req.file);
    const product = Product({
        ...productObject,
        // userId: req.auth.userId,
        // Générer l'url de l'image, multer ne permettant pas de générer l'url mais juste l'image avec req.file.filename
        url: `${req.protocol}://${req.get('host')}/image/${req.file.filename}`
    });
    // enregistrement de la sauce, si il y a une erreur on positionnne une erreur 400
    product.save()
        .then(() => res.status(201).json({ message: 'objet enregistré' }))
        .catch(error => { res.status(400).json({ error }) });
}

// RÉCUPÉRER TOUTES LES SAUCES 
exports.getAllproduct = (req, res, next) => {
    Product.find()
        .then((product) => {
            console.log(product);
            res.status(200).json(product);
        })
        .catch(error => res.status(400).json({ error }));
}

// RÉCUPÉRER UNE SAUCE 
exports.getOneproduct = (req, res, next) => {
    // params.id ==> id dans l'URL 
    Product.findOne({ _id: req.params.id })
        .then((product) => {
            console.log(product);
            res.status(200).json(product)
        })
        .catch(error => res.status(400).json({ error }));
}

// MODIFIER UNE SAUCE 
// exports.modifyOneSauce = (req, res, next) => {
//     // création de l'objet sauce qui va permettre de mettre à jour la base de donnée 
//     // si on a une image en entrée 
//     const sauceObject = req.file ? {
//         ...JSON.parse(req.body.sauce),
//         imageUrl: `${req.protocol}://${req.get('host')}/image/${req.file.filename}`
//     } : { ...req.body };
//     // suppression du userId pour utiliser celui du auth (cybersecu)
//     delete sauceObject._userId;

    // on cherche l'id de l'item
//     Sauce.findOne({ _id: req.params.id })
//         .then((sauce) => {
//             // test pour vérifier l'id du user 
//             if (sauce.userId != req.auth.userId) {
//                 res.status(401).json({ message: 'Not authorized' });
//             } else {
//                 // Est ce qu'on a Url en entrée dans l'objet ???
//                 if (sauceObject.imageUrl != null){
//                 // suppression de l'image dans l'API si on a une image en entrée  
//                 const filename = sauce.imageUrl.split('/image/')[1];
//                 fs.unlink(`image/${filename}`, () => {
//                 // si le test est ok ==> mise à jour de la base de donnée 
//                 Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
//                     .then(() => res.status(200).json({ message: 'Objet modifié!' }))
//                     .catch(error => res.status(401).json({ error }));
//                 });
//                 } else {
//                     // si pas d'image en entrée alors on modifie la sauce et on supprime pas l'image dans 
//                     // l'API
//                     Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
//                     .then(() => res.status(200).json({ message: 'Objet modifié!' }))
//                     .catch(error => res.status(401).json({ error }));
//                 }

//             }
//         })
//         .catch((error) => {
//             res.status(400).json({ error });
//         });
// }
// SUPPRIMER UNE SAUCE 
// exports.deleteOneSauce = (req, res, next) => {
//     Sauce.findOne({ _id: req.params.id })
//         .then(sauce => {
//             if (sauce.userId != req.auth.userId) {
//                 res.status(401).json({ message: 'Not authorized' });
//             } else {
//                 const filename = sauce.imageUrl.split('/image/')[1];
//                 fs.unlink(`image/${filename}`, () => {
//                     Sauce.deleteOne({ _id: req.params.id })
//                         .then(() => { res.status(200).json({ message: 'Objet supprimé !' }) })
//                         .catch(error => res.status(401).json({ error }));
//                 });
//             }
//         })
//         .catch(error => {
//             res.status(500).json({ error });
//         });
// }



