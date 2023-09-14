const express = require('express');
// objet router qui permet de router avec les controllers 
const router = express.Router(); 

// importation des règles métiers 
const  messagesMethods = require('../controllers/messages'); 
const multer = require('../middleware/multer-config'); 

// Création d'un message avec la méthode POST 
router.post('/', multer, messagesMethods.messageCreating);

// récupération de toutes les messages
router.get('/', messagesMethods.getAllMessages);

// récupération d'un message 
router.get('/:id', messagesMethods.getOneMessage);

// export du module pour app.js 
module.exports = router;  