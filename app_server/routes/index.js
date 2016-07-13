var express = require('express');
var router = express.Router();

/* Controller modules */
var ctrlHome = require('../controllers/home');
var ctrlRegister = require('../controllers/register');
var ctrlLogin = require('../controllers/login');
var ctrlActivity = require('../controllers/activity');

/* Home Page */
router.get('/', ctrlHome.homepage);

/* Register Pages */
router.get('/register', ctrlRegister.registerhome);
router.get('/register/student', ctrlRegister.registerstudent);
router.get('/register/counsellor', ctrlRegister.registercounsellor);

/* Login Page */
router.get('/login', ctrlLogin.loginhome);

/* Activity Page */
router.get('/activity', ctrlActivity.activityhome);

module.exports = router;
