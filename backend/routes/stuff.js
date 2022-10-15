// creation d'un routeur qu'on va apporter dans l'application
const express = require('express');
// prend en compte la configuration qui est mise en place sur ../middleware/auth.json
// le fait de le mettre sur les requettes permet de vérifier si nos requetes sont authentifier
const auth = require('auth');
const router = express.Router();

const stuffController = require('../controllers/stuffController');

// donc au lieu de faire app.get ou app.post ça va devenir router.get/ router.post
// uniquement les requetes posts sont accepter sur ce middelware;
router.post('/', auth, stuffController.createThing);
router.put('/:id', auth, stuffController.updateThing);
router.delete('/:id', auth, stuffController.deleteThing);
router.get('/:id', auth, stuffController.getThingById)
router.get('/', auth, stuffController.getAllThings);

module.exports = router; 