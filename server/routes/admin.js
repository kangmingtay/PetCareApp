var express = require("express");
var router = express.Router();

const getBids = require("../handlers/adminHandler").handleGetBids;
const getBidsInRange = require("../handlers/adminHandler").handleGetBidsInRange;
const getBidsForUser = require("../handlers/adminHandler").handleGetBidsForUser;
const getPayment = require("../handlers/adminHandler").handleGetPayment;
router.get("/bids", (req, res) => getBids(req, res));
router.get("/bids/:start_date/:end_date", (req, res) =>
  getBidsInRange(req, res)
);
router.get("/bids/:cname/:start_date/:end_date", (req, res) =>
  getBidsForUser(req, res)
);
router.get("/payment/:cname/:start_date/:end_date", (req, res) =>
  getPayment(req, res)
);

module.exports = router;
