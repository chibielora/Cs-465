const express = require('express'); // Express app
const router = express.Router(); // Router logic
const { expressjwt: jwt } = require("express-jwt");

const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ['RS256']
});


// This is where we import the controllers we will route
const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication')

router
    .route('/login')
    .post(authController.login);

router
    .route('/register')
    .post(authController.register);

// Define route for our trips endpoint
// router.get('/trips', tripsController.tripslist);
// GET Method routes tripsList
router
    .route('/trips')
    .get(tripsController.tripslist) // GET method routes tripList
    .post(auth, tripsController.tripsAddTrip) // POST method adds a trip

// GET Method routes tripsFindByCode - require parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(auth, tripsController.tripsUpdateTrip);

module.exports = router;