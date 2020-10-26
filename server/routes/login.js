var express = require('express');
var router = express.Router();

const getLoginInfo = require('../handlers/loginHandler').handleLogin;

router.get('/', (req, res) => getLoginInfo(req, res));

module.exports = router;