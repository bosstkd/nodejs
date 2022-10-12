// creation d'un routeur qu'on va apporter dans l'application
const express = require('express');
const router = express.Router();
const stuffController = require('../controllers/stuffController');

// donc au lieu de faire app.get ou app.post ça va devenir router.get/ router.post
// uniquement les requetes posts sont accepter sur ce middelware;
router.post('/', stuffController.createThing);

router.put('/:id', stuffController.updateThing);
router.delete('/:id', stuffController.deleteThing);
router.get('/:id', stuffController.getThingById)
router.get('/', stuffController.getAllThings);

module.exports = router; 