var express = require('express');
var router = express.Router();

const getAlldays = require('../handlers/adminHandler').handleGetAllDays;
const getPetDays = require('../handlers/adminHandler').handleGetPetDays;
const getPets = require('../handlers/adminHandler').handleGetPets;
const getRevenue = require('../handlers/adminHandler').handleGetRevenue;
const getRating = require('../handlers/adminHandler').handleGetRating;
const getCaretakers = require('../handlers/adminHandler').handleGetCaretakers;
router.get('/alldays', (req, res) => getAlldays(req, res));
router.get('/petdays', (req, res) => getPetDays(req, res));
router.get('/pets', (req, res) => getPets(req, res));
router.get('/revenue', (req, res) => getRevenue(req, res));
router.get('/rating', (req, res) => getRating(req, res));
router.get('/caretakers', (req, res) => getCaretakers(req, res));

// const getBidsInMonth = require('../handlers/adminHandler').handleGetBidsInMonth;
// const getBidsInRange = require('../handlers/adminHandler').handleGetBidsInRange;
// const getBidsForUser = require('../handlers/adminHandler').handleGetBidsForUser;
// const getPayment = require('../handlers/adminHandler').handleGetPayment;
// router.get('/bids/:month', (req, res) => getBidsInMonth(req, res));
// router.get('/bids/:start_date/:end_date', (req, res) => getBidsInRange(req, res));
// router.get('/bids/:cname/:start_date/:end_date', (req, res) => getBidsForUser(req, res));
// router.get('/payment/:cname/:start_date/:end_date', (req, res) => getPayment(req, res));

module.exports = router;
