const multer = require('multer');

const MIME_TYPE = {
 'image/jpg': 'jpg',
 'image/jpeg': 'jpg',
 'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        // images c'est le nom du dossier
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPE[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({storage}).single('image');

// afin d'uploader des fichiers on a besoin de multer
// >$ npm install --save multer
// ci-dessus la configuration multer pour les images de type jpg et png