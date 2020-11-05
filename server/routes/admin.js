var express = require('express');
var router = express.Router();

const getPetDays = require('../handlers/adminHandler').handleGetPetDays;
const getCaretakerDays = require('../handlers/adminHandler').handleGetCaretakerDays;
const getPets = require('../handlers/adminHandler').handleGetPets;
const getRevenue = require('../handlers/adminHandler').handleGetRevenue;
const getRating = require('../handlers/adminHandler').handleGetRating;
router.get('/petdays/:month/:year', (req, res) => getPetDays(req, res));
router.get('/caretakerdays/:month/:year', (req, res) => getCaretakerDays(req, res));
router.get('/pets/:month/:year', (req, res) => getPets(req, res));
router.get('/revenue/:month/:year', (req, res) => getRevenue(req, res));
router.get('/rating', (req, res) => getRating(req, res));

const getBidsInMonth = require('../handlers/adminHandler').handleGetBidsInMonth;
const getBidsInRange = require('../handlers/adminHandler').handleGetBidsInRange;
const getBidsForUser = require('../handlers/adminHandler').handleGetBidsForUser;
const getPayment = require('../handlers/adminHandler').handleGetPayment;
router.get('/bids/:month', (req, res) => getBidsInMonth(req, res));
router.get('/bids/:start_date/:end_date', (req, res) => getBidsInRange(req, res));
router.get('/bids/:cname/:start_date/:end_date', (req, res) => getBidsForUser(req, res));
router.get('/payment/:cname/:start_date/:end_date', (req, res) => getPayment(req, res));

module.exports = router;
