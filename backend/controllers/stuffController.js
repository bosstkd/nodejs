// En java c'est les services
const Thing = require('../models/Thing');

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