const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const userModel = require('../models/User');

exports.singup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(() => res.status(201).json({messsage: 'Utilisateur enregistré !'}))
        .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(500).json({error}));
};

exports.login = (req, res, next) => {
    const erreurAuth = 'Paire identifiant/mot de passe incorrecte';
    User.findOne({email: req.body.email})
    .then(user => {
        if (user == null){
            res.status(401).json({message: erreurAuth});
        } else {
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    res.status(401).json({message: erreurAuth});
                } else {
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    })
                }
            })
            .catch(error => {
                res.status(500).json({error})
            })
        }
    })
    .catch(error => {
        res.status(500).json({error})
    });
}

// on install bcrypt pour le cryptage des mots passes
// commande: $ npm install --save bcrypt

// pour faire fonctionner les tokens il faut installer le package json web token
// commande: $ npm install --save jsonwebtoken