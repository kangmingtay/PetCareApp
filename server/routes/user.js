var express = require('express');
var router = express.Router();

const getAllUsers = require('../handlers/userHandler').handleGetAllUsers;

router.get('/', (req, res) => getAllUsers(req, res));

module.exports = router;