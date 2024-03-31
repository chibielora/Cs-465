// Bring in the DB connection and the Trip schematic

const Mongoose = require("./db");
const Trip = require("./travlr");

// Read seed data from json file

var fs = require("fs");
var trips = JSON.parse(fs.readFileSync("./data/trips.json", "utf8"))

// delete any existing records, then insert seed data

const seedDB = async () => {

    await Trip.deleteMany({});
    await Trip.insertMany(trips);
};

// Close the MongoDB connection and exit

seedDB().then(async () => {
    console.log("after Connection Established")
    await Mongoose.connection.close();
    process.exit(0);

});