// permet d'insérer les images via un fichier 
const multer = require('multer');
const MINE_TYPES = {
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/jpeg': 'jpg'
};

// création d'un objet de confiration multer 
const storage = multer.diskStorage(
    // disc storage à besoin de la destination : dossier images 
    // et du nom du fichier : quel fichier utiliser 
    {
        destination: (req, file, callback) => {
            callback(null, 'file')
        },
        
        filename: (req, file, callback) => {
            // générer le nouveau nom pour le fichier 
            // Éliminer les espaces et remplacer par des undersors : possibles dans certains OS  
            const name = file.originalname.split(' ').join('_');
            // Apliquer une extension au fichier grace au mine_types 
            const extension = MINE_TYPES[file.mimetype]; 
            callback(null, name + Date.now() + '.' + extension)
        }
    }
); 

module.exports = multer({storage}).single('file'); 