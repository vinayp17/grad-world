var express = require('express');
var router = express.Router();

/* Controller modules */
var ctrlHome = require('../controllers/home');
var ctrlRegister = require('../controllers/register');
var ctrlActivity = require('../controllers/activity');
var ctrlLogout = require('../controllers/logout');


/* Home Page */
router.get('/', ctrlHome.homepage);
router.post('/', ctrlHome.homelogin);
router.post('/register', ctrlHome.register);

/* Register Pages */
router.get('/register', ctrlRegister.registerhome);
router.get('/register/student', ctrlRegister.registerstudent);
router.get('/register/counsellor', ctrlRegister.registercounsellor);

/* Activity Page */
router.get('/activity', ctrlActivity.userAuthenticated, ctrlActivity.activityhome);

/* Logout */
router.get('/logout', ctrlLogout.logout);

/* Demo - to understand layout */
router.get('/demo', ctrlHome.demo);


module.exports = router;
