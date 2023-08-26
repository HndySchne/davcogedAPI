// importation de l'objet user du model
// const bcrypt = require('bcrypt');
const Product = require('../models/products');
// import de jsonwebtoken pour créer des tokens (sécurité)
const jwt = require('jsonwebtoken');
// permet de manipuler des fichiers 
const fs = require('fs');
const { log } = require('console');

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
        url: `${req.protocol}://${req.get('host')}/file/${req.file.filename}`
    });
    // enregistrement de la sauce, si il y a une erreur on positionnne une erreur 400
    product.save()
        .then(() => res.status(201).json({ message: 'objet enregistré' }))
        .catch(error => { res.status(400).json({ error }) });
}

// RÉCUPÉRER TOUS LES PRODUITS
exports.getAllproduct = (req, res, next) => {
    console.log('================================== Récupérer tout les produits ==========================================');
    Product.find()
        .then((product) => {
            console.log(product);
            res.status(200).json(product);
            console.log('================================== FIN LECTURE ==========================================');
        })
        .catch(error => res.status(400).json({ error }));
}

// RÉCUPÉRER UN PRODUIT 
exports.getOneproduct = (req, res, next) => {
    // params.id ==> id dans l'URL 
    Product.findOne({ _id: req.params.id })
        .then((product) => {
            console.log(product);
            res.status(200).json(product)
        })
        .catch(error => res.status(400).json({ error }));
}

// MODIFIER UN PRODUIT
exports.modifyOneProduct = (req, res, next) => {
    console.log('============================================================== début modification =========== ');
    // création de l'objet sauce qui va permettre de mettre à jour la base de donnée 
    // si on a une image en entrée 
    console.log('BODY MODIF :', req.body);
    console.log('FILE MODIF :', req.file);
    const productObject = req.file ? {
        ...req.body,
        url: `${req.protocol}://${req.get('host')}/file/${req.file.filename}`
    } : { ...req.body };
    // suppression du userId pour utiliser celui du auth (cybersecu)
    // delete productObject._userId;

    // on cherche l'id de l'item
    Product.findOne({ _id: req.params.id })
        .then((product) => {
            // test pour vérifier l'id du user 
            // if (sauce.userId != req.auth.userId) {
            //     res.status(401).json({ message: 'Not authorized' });
            // } else {
                // Est ce qu'on a Url en entrée dans l'objet ???
                console.log('productObject.url', productObject.url); 
                if (productObject.url != null){
                // suppression de l'image dans l'API si on a une image en entrée  
                const filename = product.url.split('/file/')[1];
                console.log('filename :', filename);
                fs.unlink(`file/${filename}`, () => {
                // si le test est ok ==> mise à jour de la base de donnée 
                Product.updateOne({ _id: req.params.id }, { ...productObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet modifié!' }))
                    .catch(error => res.status(401).json({ error }));
                });
                } else {
                    // si pas d'image en entrée alors on modifie la sauce et on supprime pas l'image dans 
                    // l'API
                    Product.updateOne({ _id: req.params.id }, { ...productObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet modifié!' }))
                    .catch(error => res.status(401).json({ error }));
                }
                console.log('============================================================== fin modification =========== ');
            // }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
}
// SUPPRIMER UNE SAUCE 
exports.deleteOneProduct = (req, res, next) => {
    console.log('============================================= DÉBUT SUPPRESSION : ', req.params.id);
    Product.findOne({ _id: req.params.id })
        .then(product => {
            // if (sauce.userId != req.auth.userId) {
            //     res.status(401).json({ message: 'Not authorized' });
            // } else {
                console.log('product.url :', product.url);
                const filename = product.url.split('/file/')[1];
                console.log('filename : ', filename);
                fs.unlink(`file/${filename}`, () => {
                    Product.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'Objet supprimé !' })
                        console.log('================================== FIN SUPRESSION =========================================='); })
                        .catch(error => res.status(401).json({ error }));
                });
            // }
        })
        .catch(error => {
            res.status(500).json({ error });
        });
}



