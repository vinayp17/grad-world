/* GET activity page */
module.exports.activityhome = function( req, res ) {
    res.render('activity', {title : 'ActivityHome', "program": ['ECE', 'CS', 'None'] , "location": ['UNITED STATES', 'INDIA'], "schools": ['Georgia Tech', 'University of Texas, Austin']});
};