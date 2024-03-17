var express = require('express');
var router = express.Router();
const ctrlMain = require('../controllers/travel');

/* GET home page. */
router.get('/', ctrlMain.travel);

module.exports = router;
