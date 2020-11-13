var express = require('express');
var router = express.Router();

const getReviewAndRating = require('../handlers/petownerHandler').handleGetPetsHistory;
const updateReviewAndRating = require('../handlers/petownerHandler').handleUpdateReviewsAndRating;

router.get('/:pname', (req, res) => getReviewAndRating(req, res));
router.put('/:pname', (req, res) => updateReviewAndRating(req, res));

module.exports = router;