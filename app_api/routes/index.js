var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});

var ctrlAuth = require('../controllers/authentication');
var crtlActivity = require('../controllers/activity.js');
var validateUser = function(req, res) {
    if (!req.session.token) return res.sendStatus(401);
    //next();
}

router.post('/register/counsellor', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
// add auth mechanism to secure api routes
router.get('/school', crtlActivity.getProgramInfo);

module.exports = router;
