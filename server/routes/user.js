var express = require('express');
var router = express.Router();

const getUser = require('../handlers/userHandler').handleGetUser;
const deleteUser = require('../handlers/userHandler').handleDeleteUser;
const createUser = require('../handlers/userHandler').handleCreateUser;
const updateUser = require('../handlers/userHandler').handleUpdateUser;
const getAllUsers = require('../handlers/userHandler').handleGetAllUsers;
const getUserType = require('../handlers/userHandler').handleCheckUserType;

router.get('/:username', (req, res) => getUser(req, res));
router.get('/type/:username', (req, res) => getUserType(req, res));
router.delete('/:username', (req, res) => deleteUser(req, res));
router.post('/', (req, res) => createUser(req, res));
router.put('/:username', (req, res) => updateUser(req, res));
router.get('/', (req, res) => getAllUsers(req, res));

module.exports = router;