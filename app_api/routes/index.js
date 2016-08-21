var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});

var ctrlAuth = require('../controllers/authentication');

router.post('/register/counsellor', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
