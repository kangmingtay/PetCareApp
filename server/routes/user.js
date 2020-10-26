var express = require('express');
var router = express.Router();

const getUser = require('../handlers/userHandler').handleGetUser;
const createUser = require('../handlers/userHandler').handleCreateUser;
const getAllUsers = require('../handlers/userHandler').handleGetAllUsers;

router.get('/:username', (req, res) => getUser(req, res));
router.post('/', (req, res) => createUser(req, res));
router.get('/', (req, res) => getAllUsers(req, res));

module.exports = router;