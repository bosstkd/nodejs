const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const userShema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

userShema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userShema);

// Ajout du package mongoose-unique-validator
// Commande : $ npm install --save mongoose-unique-validator
// bcrypt  est un package de cryptage que vous pouvez installer avec  npm  .