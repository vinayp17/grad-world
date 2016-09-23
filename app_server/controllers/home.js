var request = require('request'); // used to make call to api


/* GET home page */
module.exports.homepage = function(req, res) {
    if (req.session.token) {
        res.redirect('/activity');
    }
    else {
        res.render('home', {title: 'HomePage'});
    }
};

/* Handle post request for login */
module.exports.homelogin = function(req, res, $window) {
    var requestOptions, path;
    path = '/api/login';
    console.log('activity controller');
    console.log(req.body);
    requestOptions = {
        url:'http://localhost:3000' + path,
        method: "POST",
        json: {
            email: req.body.email,
            password: req.body.password
        }
    };
    console.log(req.body.email);
    request(
        requestOptions,
        function(err, response, body) {
            if(err){
                console.log(err);
                console.log(response.statusCode);
            }
            else if (response.statusCode == 200){
                console.log(response.body.token);
//                $window.sessionStorage.accessToken = response.body.token;
                req.session.token = response.body.token;
                req.session.email = req.body.email;
                res.redirect('/activity');
            }
            else {
                console.log(response.statusCode);
                console.log(response);
            }

        }
    );
};

/* Handle post request for register*/
module.exports.register = function(req, res) {
    // make call to register api
    console.log("going to register user");
    console.log(req.body);
    var requestOptions, path;
    path = '/api/register/counsellor';
    requestOptions = {
        url:'http://localhost:3000' + path,
        method: "POST",
        json: {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password
        }
    };
    request(
        requestOptions,
        function(err, response, body) {
            if(err){
                console.log(err);
                console.log(response.statusCode);
            }
            else if (response.statusCode == 200){
                console.log(response.body.token);
//                $window.sessionStorage.accessToken = response.body.token;
                req.session.token = response.body.token;
                req.session.email = req.body.email;
                res.redirect('/activity');
            }
            else {
                console.log(response.statusCode);
                console.log(response);
            }

        }
    );
}