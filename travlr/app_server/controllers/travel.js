// const fs = require('fs');
// const trips = JSON.parse(fs.readFileSync('./data/trips.json' , 'utf8'));

const tripsEndpoint = 'http://localhost:3000/api/trips';
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
}

/* GET travel view */
const travel = async function(req, res, next) {
    // console.log('Travel controller begins');
    // res.render('travel', { title: "Travlr Getaways" , trips});
    await fetch(tripsEndpoint, options)
        .then(res => res.json())
        .then(json => {
            // console.log(json);
            let message = null;
            // When response does not contain any JSON data
            if(!(json instanceof Array)) {
                message = 'API lookup error';
                json = [];
            } else {
            // When there's an array of JSON objects but its length = 0
                if(!json.length) {
                    message = 'No trips exist in our database!';
                }
            }
            // Otherwise, render JSON data
            res.render('travel', { title : 'Travlr Getaways', trips: json });
        })
        .catch(err => res.status(500).send(e.message));
    // console.log('Travel controller after render');
};

module.exports = {
    travel
};