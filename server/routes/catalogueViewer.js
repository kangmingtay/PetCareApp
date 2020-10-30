var express = require('express');
var router = express.Router();

//Petowners will first need to input start_date and end_date
//Then query fetches list of caretakers(be it FT or PT) that ABLE to take care 
//(no leaves, have availability for FT n PT resp) 
//and also matches the petowner's inputted 'pet_category'
//Lastly, they will select a subset of dates between the inputted start_date and end_date for the bids

const getListOfValidCareTakers = require('../handlers/catalogueHandler').handleGetListOfCTs;

router.get('/', (req, res) => getListOfValidCareTakers(req, res));

module.exports = router;