// autentification avant les différents passages avec jwt ==> verify 
const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    try {
        // récupération du header avec le token 
        let token;
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            token = req.query.token;
        }

        if (token == null) return res.sendStatus(401);

        // décoder le token avec la méthode vérify de jwt 
        const decodedToken = jwt.verify(token, process.env.AUTH);
        // récupération de userId du token 
        const userId = decodedToken.userId;
        // retour du userId 
        req.auth = {
            userId: userId
        };

        next();
    } catch (error) {
        // erreur 401, erreur d'autentification 
        res.status(401).json({ error });
    }
}; 