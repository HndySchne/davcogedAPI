// importation de l'objet user du model
// const bcrypt = require('bcrypt');
const Message = require('../models/messages');
// import de jsonwebtoken pour créer des tokens (sécurité)
const jwt = require('jsonwebtoken');
// permet de manipuler des fichiers 
const fs = require('fs');

// CREATION D'UN EMAIL
exports.messageCreating = (req, res, next) => {
    const product = Message({...req.body});
    // enregistrement de la sauce, si il y a une erreur on positionnne une erreur 400
    product.save()
        .then(() => res.status(201).json({ message: 'message enregistré' }))
        .catch(error => { res.status(400).json({ error }) });
}

// RÉCUPÉRER TOUS LES EMAIL / MESSAGES
exports.getAllMessages = (req, res, next) => {
    Message.find()
        .then((messages) => {
            res.status(200).json(messages);
        })
        .catch(error => res.status(400).json({ error }));
}

// RÉCUPÉRER UN EMAIL / MESSAGE 
exports.getOneMessage = (req, res, next) => {
    // params.id ==> id dans l'URL 
    Message.findOne({ _id: req.params.id })
        .then((messages) => {
            console.log(messages);
            res.status(200).json(messages)
        })
        .catch(error => res.status(400).json({ error }));
}


