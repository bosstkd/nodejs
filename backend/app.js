const express = require('express');

const mongoose = require('mongoose');

const app = express();

const Thing = require('./models/Thing');

mongoose.connect('mongodb+srv://amine:j18M01a87@cluster0.pplniam.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// intecepte toutes les requettes avec un content-type json est expose ce dernier dans req.body
app.use(express.json());

// Déblocage du problème des CORS 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// uniquement les requetes posts sont accepter sur ce middelware;
app.post('/api/stuff', (req, res, next)=>{
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
});

app.get('/api/stuff/:id', (req, res, next) =>{
    // req.params.id pour récupérer les params au niveau de l'url précédé par (:)
    Thing.findOne({_id: req.params.id})
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({error: error}));
})

// uniquement les requetes gets sont accepter sur ce middelware;
app.get('/api/stuff', (req, res, next)=>{
    Thing.find()
    .then(things=>res.status(200).json(things))
    .catch(error => res.status(400).json({error: error}));
});

module.exports = app;