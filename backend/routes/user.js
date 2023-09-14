const express = require('express');
// objet router qui permet de router avec les controllers 
const router = express.Router(); 

// importation des règles métiers 
const userMethod = require('../controllers/user'); 
const multer = require('../middleware/multer-config'); 

// ROUTE INSCRIPTION  
router.post('/login', multer, userMethod.login);

// SIGNUP INSCRIPTION  
// router.post('/signup', userMethod.signup);

// export du module pour app.js 
module.exports = router; 