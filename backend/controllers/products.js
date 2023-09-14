// importation de l'objet user du model
const Product = require('../models/products');
// import de jsonwebtoken pour créer des tokens (sécurité)
const jwt = require('jsonwebtoken');
// permet de manipuler des fichiers 
const fs = require('fs');

// CREATION DU PRODUIT 
exports.productCreating = (req, res, next) => {
    // parsing des donnée en entrée pour les manipuler 
    const productObject = req.body;
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
    Product.find()
        .then((product) => {
            res.status(200).json(product);
        })
        .catch(error => res.status(400).json({ error }));
}

// RÉCUPÉRER UN PRODUIT 
exports.getOneproduct = (req, res, next) => {
    // params.id ==> id dans l'URL 
    Product.findOne({ _id: req.params.id })
        .then((product) => {
            res.status(200).json(product)
        })
        .catch(error => res.status(400).json({ error }));
}

// MODIFIER UN PRODUIT
exports.modifyOneProduct = (req, res, next) => {
    // création de l'objet sauce qui va permettre de mettre à jour la base de donnée 
    // si on a une image en entrée 
    const productObject = req.file ? {
        ...req.body,
        url: `${req.protocol}://${req.get('host')}/file/${req.file.filename}`
    } : { ...req.body };

    // on cherche l'id de l'item
    Product.findOne({ _id: req.params.id })
        .then((product) => {
            if (productObject.url != null) {
                // suppression de l'image dans l'API si on a une image en entrée  
                const filename = product.url.split('/file/')[1];
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
            // }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
}
// SUPPRIMER UNE SAUCE 
exports.deleteOneProduct = (req, res, next) => {
    Product.findOne({ _id: req.params.id })
        .then(product => {
            const filename = product.url.split('/file/')[1];
            fs.unlink(`file/${filename}`, () => {
                Product.deleteOne({ _id: req.params.id })
                    .then(() => {
                        res.status(200).json({ message: 'Objet supprimé !' })
                    })
                    .catch(error => res.status(401).json({ error }));
            });
            // }
        })
        .catch(error => {
            res.status(500).json({ error });
        });
}



