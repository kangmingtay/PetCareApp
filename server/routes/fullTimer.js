var express = require('express');
var router = express.Router();

const createFullTimer = require('../handlers/fullTimerHandler').handleCreateFullTimer;

router.post('/', (req, res) => createFullTimer(req, res));

module.exports = router;