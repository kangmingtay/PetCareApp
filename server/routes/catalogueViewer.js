var express = require('express');
var router = express.Router();

//Petowners will first need to input start_date and end_date
//Then query fetches list of caretakers(be it FT or PT) that ABLE to take care 
//(no leaves, have availability for FT n PT resp) 
//and also matches the petowner's inputted 'pet_category'
//Lastly, they will select a subset of dates between the inputted start_date and end_date for the bids

const getListOfValidCareTakers = require('../handlers/catalogueHandler').handleGetListOfCTs;
const getPetsForDateRange = require('../handlers/catalogueHandler').handleGetPetsForDateRange;
const insertBid = require('../handlers/catalogueHandler').handleInsertBid;

router.get('/', (req, res) => getListOfValidCareTakers(req, res));

//pass in extra 'query' of date range and (optional) petCategory
router.get('/:pname', (req, res) => getPetsForDateRange(req, res)); 

//pass in startDate, endDate, pname, pet_name
//also pass in payment_amt, transaction_type
router.post('/:cname', (req, res) => insertBid(req, res)); 

module.exports = router;