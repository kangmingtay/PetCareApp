var express = require('express');
var router = express.Router();

const getExpectedSalary = require('../handlers/careTakerHandler').handleGetExpectedSalary;
const getCareTakerCalender = require('../handlers/careTakerHandler').handleGetCareTakerCalendar;
const updatePreferences = require('../handlers/careTakerHandler').handleUpdatePreferences;
const createPreferences = require('../handlers/careTakerHandler').handleCreatePreferences;
const deletePreferences = require('../handlers/careTakerHandler').handleDeletePreferences;
const getPreferences = require('../handlers/careTakerHandler').handleGetPreferences;
const postNotWorking = require('../handlers/careTakerHandler').handlerAddNotWorking;
const deleteNotWorking = require('../handlers/careTakerHandler').handlerDeleteNotWorking;
const getLeaves = require('../handlers/careTakerHandler').handleGetLeaves;
const getAvailability = require('../handlers/careTakerHandler').handleGetAvailability;
const getCareTakerRating = require('../handlers/careTakerHandler').handleGetCareTakerRating;
const selectBid = require('../handlers/careTakerHandler').handleSelectBid;
const getAllPreferences = require('../handlers/careTakerHandler').handleGetAllCategories;

router.get('/expectedSalary/:username', (req, res) => getExpectedSalary(req, res));
router.get('/calendar/:username', (req, res) => getCareTakerCalender(req, res));
router.get('/prefers/', (req, res) => getAllPreferences(req, res));
router.get('/prefers/:username', (req, res) => getPreferences(req, res));
router.delete('/prefers/:username', (req, res) => deletePreferences(req, res));
router.post('/prefers/:username', (req, res) => createPreferences(req, res));
router.put('/prefers/:username', (req, res) => updatePreferences(req, res));
router.post('/requestDays/:username', (req, res) => postNotWorking(req, res));
router.get('/leaves/:username', (req, res) => getLeaves(req, res));
router.get('/availability/:username', (req, res) => getAvailability(req, res));
router.delete('/requestDays/:username', (req, res) => deleteNotWorking(req, res));
router.get('/rating/:username', (req, res) => getCareTakerRating(req, res));
router.post('/selectbid/:username', (req, res) => selectBid(req, res));

module.exports = router;