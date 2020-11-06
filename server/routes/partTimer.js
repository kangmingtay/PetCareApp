var express = require('express');
var router = express.Router();

const createPartTimer = require('../handlers/partTimerHandler').handleCreatePartTimer;

router.post('/', (req, res) => createPartTimer(req, res));

module.exports = router;