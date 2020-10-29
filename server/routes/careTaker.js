var express = require('express');
var router = express.Router();

const getExpectedSalary = require('../handlers/careTakerHandler').handleGetExpectedSalary;
const getCareTakerCalender = require('../handlers/careTakerHandler').handleGetCareTakerCalendar;
const putCategory = require('../handlers/careTakerHandler').handleUpdateCategory;
const postCategory = require('../handlers/careTakerHandler').handleAddCategory;
const deleteCategory = require('../handlers/careTakerHandler').handleDeleteCategory;
const getCategory = require('../handlers/careTakerHandler').handleGetCategories;
const UpsertLeavesAvailability = require('../handlers/careTakerHandler').handlerUpsertLeavesAvailability;
const getLeaves = require('../handlers/careTakerHandler').handleGetLeaves;
const getAvailability = require('../handlers/careTakerHandler').handleGetAvailability
router.get('/expectedSalary/:username', (req, res) => getExpectedSalary(req, res));
router.get('/calendar/:username', (req, res) => getCareTakerCalender(req, res));
router.get('/category/:username', (req, res) => getCategory(req,res));
router.delete('/category/:username', (req, res) => deleteCategory(req,res));
router.post('/category/:username', (req, res) => postCategory(req,res));
router.put('/category/:username', (req, res) => putCategory(req,res));
router.post('/requestDays/:username', (req, res) => UpsertLeavesAvailability(req,res));
router.get('/leaves/:username', (req, res) => getLeaves(req,res));
router.get('/availability/:username', (req, res) => getAvailability(req,res));

module.exports = router;