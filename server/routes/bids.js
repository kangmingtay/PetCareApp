var express = require('express');
var router = express.Router();

const getAllBids = require('../handlers/bidsHandler.js').handleGetAllBids;
const getAllReviews = require('../handlers/bidsHandler.js').handleGetAllReviews;
const getOneReview = require('../handlers/bidsHandler.js').handleGetOneReview;
const getPetOwnerBids = require('../handlers/bidsHandler.js').handleGetPetOwnerBids;
const getCaretakerBids = require('../handlers/bidsHandler.js').handleGetCaretakerBids;
const getCaretakerBidsSortByAnything = require('../handlers/bidsHandler.js').handleGetCareTakerBidsSortByAnything;
const getCaretakerBidsFilterByAnything = require('../handlers/bidsHandler.js').handleGetCareTakerBidsFilterByAnything;
const getCaretakerBidsFilterSortByAnything = require('../handlers/bidsHandler.js').handleGetCareTakerBidsFilterSortByAnything;

router.get('/', (req, res) => getAllBids(req, res));
router.get('/reviews', (req, res) => getAllReviews(req, res));
router.get('/reviews/:username', (req, res) => getOneReview(req, res));
router.get('/orders/:username', (req, res) => getPetOwnerBids(req, res));
router.get('/jobs/:username', (req, res) => getCaretakerBids(req, res));
router.get('/jobs/sort/:username/:sort/:order', (req, res) => getCaretakerBidsSortByAnything(req, res))
router.get('/jobs/filter/:username/:filter/:by', (req, res) => getCaretakerBidsFilterByAnything(req, res))
router.get('/jobs/:username/:filter/:by/:sort/:order', (req, res) => getCaretakerBidsFilterSortByAnything(req, res))

module.exports = router;