const express = require('express');
// objet router qui permet de router avec les controllers 
const router = express.Router(); 
// const multer = require('multer');
// const upload = multer({ dest: 'files/' });

// importation des règles métiers 
const productsMethods = require('../controllers/products'); 
// const auth = require('../middleware/auth'); 
const multer = require('../middleware/multer-config'); 

// Création d'un produit avec la méthode POST 
// router.post('/', auth, multer, productsMethods.productCreating);
// router.post('/', upload.any(), productsMethods.productCreating);
router.post('/', multer, productsMethods.productCreating);

// récupération de toutes les sauces 
// router.get('/', auth, productsMethods.getAllproduct);
router.get('/', productsMethods.getAllproduct);

// récupération d'une sauce
// router.get('/:id', auth, productsMethods.getOneSauce);
router.get('/:id', productsMethods.getOneproduct);

// // modification d'une sauce
// router.put('/:id', auth, multer, sauceMethods.modifyOneSauce);

// // suppression d'une sauce
// router.delete('/:id', auth, multer, sauceMethods.deleteOneSauce);
router.delete('/:id', multer, productsMethods.deleteOneProduct);

// export du module pour app.js 
module.exports = router;  