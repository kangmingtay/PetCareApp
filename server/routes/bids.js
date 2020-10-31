var express = require('express');
var router = express.Router();

const getAllBids = require('../handlers/bidsHandler.js').handleGetAllBids;
const getAllReviews = require('../handlers/bidsHandler.js').handleGetAllReviews;
const getOneReview = require('../handlers/bidsHandler.js').handleGetOneReview;
const getPetOwnerBids = require('../handlers/bidsHandler.js').handleGetPetOwnerBids;
const getCaretakerBids = require('../handlers/bidsHandler.js').handleGetCaretakerBids;

router.get('/', (req, res) => getAllBids(req, res));
router.get('/reviews', (req, res) => getAllReviews(req, res));
router.get('/reviews/:username', (req, res) => getOneReview(req, res));
router.get('/orders/:username', (req, res) => getPetOwnerBids(req, res));
router.get('/jobs/:username', (req, res) => getCaretakerBids(req, res));

module.exports = router;