const express = require('express'); // Express app
const router = express.Router(); // Router logic

// This is where we import the controllers we will route
const tripsController = require('../controllers/trips');

// Define route for our trips' endpoint
// router.get('/trips', tripsController.tripslist);

 // GET Method routes tripsList
router
    .route('/trips')
    .get(tripsController.tripslist);

 // GET Method routes tripsFindByCode - require parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode);

module.exports = router;