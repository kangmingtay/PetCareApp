var express = require('express');
var router = express.Router();

const getExpectedSalary = require('../handlers/careTakerHandler').handleGetExpectedSalary;
const getCareTakerCalender = require('../handlers/careTakerHandler').handleGetCareTakerCalendar;
router.get('/expectedSalary/:username', (req, res) => getExpectedSalary(req, res));
router.get('/calendar/:username', (req, res) => getCareTakerCalender(req, res));

module.exports = router;