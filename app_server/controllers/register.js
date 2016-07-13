/* GET Register-home page */
module.exports.registerhome = function(req, res) {
    res.render('index', { title: 'RegisterHome'});
};

/* Get Register-student page */
module.exports.registerstudent = function(req, res) {
    res.render('index', { title: 'RegisterStudent'});
};

/* Get Register-counsellor page */
module.exports.registercounsellor = function(req, res) {
    res.render('index', { title: 'RegisterCounsellor'});
};


