const express = require('express');
// objet router qui permet de router avec les controllers 
const router = express.Router(); 

// importation des règles métiers 
const productsMethods = require('../controllers/products'); 
const auth = require('../middleware/auth'); 
const multer = require('../middleware/multer-config'); 

// Création d'un produit avec la méthode POST 
router.post('/', auth, multer, productsMethods.productCreating);

// récupération de toutes les produits 
router.get('/', productsMethods.getAllproduct);

// récupération d'un produit 
router.get('/:id', productsMethods.getOneproduct);

// modification d'un produit 
router.put('/:id', auth, multer, productsMethods.modifyOneProduct);

// suppression d'un produit 
router.delete('/:id', auth, multer, productsMethods.deleteOneProduct);

// export du module pour app.js 
module.exports = router;  