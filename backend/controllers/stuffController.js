// En java c'est les services
const Thing = require('../models/Thing');
const fs = require('fs'); // fs == fileSystem

exports.createThing = (req, res, next)=>{
    const thingObject = JSON.parse(req.body.thing0);
    delete thingObject._id;
    delete thingObject._userId;
    const thing = new Thing({
        ...thingObject, 
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    thing.save()
    .then(() => res.status(201).json({message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({error: error}));
};

exports.updateThing = (req, res, next) => {
    // 2 cas à gérer avec ou sans fichier
    const thingObject = req.file ? {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : 
    { ...req.body };
    delete thingObject._userId;
    Thing.findOne({_id: req.params.id})
        .then(thing => {
            if (thing.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non-autorisé'});
            } else {
                Thing.updateOne({ _id: req.params.id, { ...thingObject, _id: req.params.id})
                .then(() => res.status(200).json({message: 'Objet Modifié !'}))
                .catch(error => res.status(400).json({error: error}));
            }
        })
        .catch(error => res.status(404).json({error: error}));
  };

  exports.deleteThing = (req, res, next) => {
    Thing.findOne({_id: req.params.id})
        .then(thing => {
            if (thing.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non-autorisé'});
            } else {
                const filename = thing.imageUrl.split('/imgaes/')[1];
                fs.unlink(`imgaes/${filename}`, () => {
                    Thing.deleteOne({_id: req.params.id})
                    .then(() => res.status(200).json({message: 'Objet Supprimé !'}))
                    .catch(error => res.status(400).json({error: error}));
                });
            }
        })
        .catch(error => res.status(500).json({error: error}));
  };  
/*
exports.createThing = (req, res, next)=>{
    // on enleve le champs id du corp de la requette puisque on utilise ...req.body 
    // et que l'id est auto-générer par mongoDb
    delete req.body._id;
    const thing = new Thing({
        // au lieu d'utiliser un passage classique des données et de les mappers un/un 
        // on va utiliser body spread de JS
        ...req.body
    });
    thing.save()
    .then(() => res.status(201).json({message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({error: error}));
};


exports.updateThing = (req, res, next) => {
    Thing.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
    .then(() => res.status(200).json({message: 'Objet Modifié !'}))
    .catch(error => res.status(400).json({error: error}));
  };

exports.deleteThing = (req, res, next) => {
    Thing.deleteOne({_id: req.params.id})
    .then(() => res.status(200).json({message: 'Objet Supprimé !'}))
    .catch(error => res.status(400).json({error: error}));
  };  
*/

exports.getThingById = (req, res, next) =>{
    // req.params.id pour récupérer les params au niveau de l'url précédé par (:)
    Thing.findOne({_id: req.params.id})
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({error: error}));
};

exports.getAllThings = (req, res, next)=>{
    Thing.find()
    .then(things=>res.status(200).json(things))
    .catch(error => res.status(400).json({error: error}));
};