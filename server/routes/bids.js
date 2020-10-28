var express = require('express');
var router = express.Router();

const getAllBids = require('../handlers/bidsHandler.js').handleGetAllBids;
const getAllReviews = require('../handlers/bidsHandler.js').handleGetAllReviews;
const getOneReview = require('../handlers/bidsHandler.js').handleGetOneReview;
const getPastOrders = require('../handlers/bidsHandler.js').handleGetPastOrders;
const getPastJobs = require('../handlers/bidsHandler.js').handleGetPastJobs;

router.get('/', (req, res) => getAllBids(req, res));
router.get('/reviews', (req, res) => getAllReviews(req, res));
router.get('/reviews/:username', (req, res) => getOneReview(req, res));
router.get('/orders/:username', (req, res) => getPastOrders(req, res));
router.get('/jobs/:username', (req, res) => getPastJobs(req, res));

module.exports = router;