/* GET activity page */
var request = require('request');

/* Middleware function to authenticate user before issuing a GET request */
module.exports.userAuthenticated = function (req, res, next){
    if( req.session.token) {
        next();
    }
    else {
        res.redirect('/');
    }
};

/* Wrapper around rendering activity page, might enhance for future DB interactions */
module.exports.activityhome = function( req, res ) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    renderActivityPage(req, res);
};

/* Simple function which renders the activity page */
var renderActivityPage = function(req, res) {
    res.render('activity', {title : 'ActivityHome', "program": ['ECE', 'CS', 'None'] , "location": ['UNITED STATES', 'INDIA'], "schools": ['Georgia Tech', 'University of Texas, Austin']});
};