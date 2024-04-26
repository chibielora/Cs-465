const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');

const getUser = (req, res, callback) => {
    if (req.payload && req.payload.email) {
        User
            .findOne({
                email: req.payload.email
            })
            .exec((err, user) => {
                if (!user) {
                    return res
                        .status(404)
                        .json({
                            "message": "User not found"
                        });
                } else if (err) {
                    console.log(err);
                    return res
                        .status(404)
                        .json(err);
                }
                callback(req, res, user.name);
            });
    } else {
        return res
            .status(404)
            .json({
                "message": "User not found"
            });
    }
};

// GET: /trips - lists all the trips
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client

const tripslist = async(req, res) => {
    const q = await Model
        .find({}) // No filter, return all records
        .exec();

    // Uncomment the following line to show results of query on the console
    // console.log(q);

    if(!q) {
        // Database returned no data
        return res
            .status(404)
            .json(err);
    } else {
        // Return resulting trip list
        return res
            .status(200)
            .json(q);
    }
};

// GET: /trips/:tripcode - lists a single trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client

const tripsFindByCode = async(req, res) => {
    const q = await Model
        .find({ 'code' : req.params.tripCode }) // Return single record
        .exec();

    // Uncomment the following line to show results of query on the console
    // console.log(q);

    if(!q) {
        // Database returned no data
        return res
            .status(404)
            .json(err);
    } else {
        // Return resulting trip list
        return res
            .status(200)
            .json(q);
    }
};

// POST: /trips - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsAddTrip = async (req, res) => {
    getUser(req, res,
        (req, res) => {
            Trip
                .create({
                        code: req.body.code,
                        name: req.body.name,
                        length: req.body.length,
                        start: req.body.start,
                        resort: req.body.resort,
                        perPerson: req.body.perPerson,
                        image: req.body.image,
                        description: req.body.description
                    },
                    (err, trip) => {
                        if (err) {
                            return res
                                .status(400) // Bad request
                                .json(err);
                        } else {
                            return res
                                .status(201) // Acc created
                                .json(trip);
                        }
                    }
                );
        });
}


// OLD CODE FOR COMPARISON
// const tripsAddTrip = async (req, res) => {
//     const newTrip = new Trip({
//         code: req.body.code,
//         name: req.body.name,
//         length: req.body.length,
//         start: req.body.start,
//         resort: req.body.resort,
//         perPerson: req.body.perPerson,
//         image: req.body.image,
//         description: req.body.description,
//     });

//     const q = await newTrip.save();

//         if (!q) {
//             // Database returned no data
//             return res
//                 .status(400)
//                 .json(err);
//         } else { // Return new trip
//             return res
//                 .status(201) // Sucessfully created
//                 .json(q);
//         }
        
//         // Show results of operation
//         // console.log(q);
// };

// PUT: /trips/:tripCode - Adds a new Trip
// Response must include HTML status code
// and JSON message to the requesting client
const tripsUpdateTrip = async (req, res) => {
    getUser(req, res,
        (req, res) => {
            Trip
                .findOneAndUpdate({
                    'code': req.params.tripCode
                }, {
                    code: req.body.code,
                    name: req.body.name,
                    length: req.body.length,
                    start: req.body.start,
                    resort: req.body.resort,
                    perPerson: req.body.perPerson,
                    image: req.body.image,
                    description: req.body.description
                }, {
                    new: true
                })
                .then(trip => {
                    if (!trip) {
                        return res
                            .status(404)
                            .send({
                                message: "Trip not found with code " + req.params.tripCode
                            });
                    }
                    res.send(trip);
                }).catch(err => {
                    if (err.kind === 'ObjectId') {
                        return res
                            .status(404)
                            .send({
                                message: 'Trip not found with code ' + req.params.tripCode
                            });
                    }
                    return res
                        .status(500) // Server error
                        .json(err);
                });
        });
}


// OLD CODE FOR COMPARISON
// const tripsUpdateTrip = async (req, res) => {
//     // console.log(req.body);
//     // console.log(req.params);
//     const q = await Model
//         .findOneAndUpdate(
//         { 'code': req.params.tripCode },
//             {
//             code: req.body.code,
//             name: req.body.name,
//             length: req.body.length,
//             start: req.body.start,
//             resort: req.body.resort,
//             perPerson: req.body.perPerson,
//             image: req.body.image,
//             description: req.body.description,
//         })

//         .exec();

//         if(!q) {
//             // Database returned no data
//             return res
//             .status(400)
//             .json({ error: "Trip not found" })
//             // .json(err);
//         } else {
//             return res
//             .status(201)
//             .json(q);
//         }
//     // Uncomment the following line to show results of operation
//     // console.log(q);
// };

module.exports = {
    tripsAddTrip,
    tripslist,
    tripsFindByCode,
    tripsUpdateTrip
};