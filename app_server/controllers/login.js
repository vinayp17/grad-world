/* GET login page */
module.exports.loginhome = function(req, res) {
    res.render('index', { title: 'LoginHome' } );
};