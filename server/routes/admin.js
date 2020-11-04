var express = require('express');
var router = express.Router();

const getPetDays = require('../handlers/adminHandler').handleGetPetDays;
const getPetCaretakerDays = require('../handlers/adminHandler').handleGetCaretakerDays;
const getPets = require('../handlers/adminHandler').handleGetPets;
router.get('/petdays/:month/:year', (req, res) => getPetDays(req, res));
router.get('/caretakerdays/:month/:year', (req, res) => getPetCaretakerDays(req, res));
router.get('/pets/:month/:year', (req, res) => getPets(req, res));

const getBidsInMonth = require('../handlers/adminHandler').handleGetBidsInMonth;
const getBidsInRange = require('../handlers/adminHandler').handleGetBidsInRange;
const getBidsForUser = require('../handlers/adminHandler').handleGetBidsForUser;
const getPayment = require('../handlers/adminHandler').handleGetPayment;
router.get('/bids/:month', (req, res) => getBidsInMonth(req, res));
router.get('/bids/:start_date/:end_date', (req, res) => getBidsInRange(req, res));
router.get('/bids/:cname/:start_date/:end_date', (req, res) => getBidsForUser(req, res));
router.get('/payment/:cname/:start_date/:end_date', (req, res) => getPayment(req, res));

module.exports = router;
