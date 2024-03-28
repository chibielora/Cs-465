const fs = require('fs');
const rooms = JSON.parse(fs.readFileSync('./data/rooms.json' , 'utf8'));

/* GET room view */

const room = (req, res) => {
    res.render('travel', { title: "Travlr Rooms" , rooms});

};

module.exports = {
    room
};