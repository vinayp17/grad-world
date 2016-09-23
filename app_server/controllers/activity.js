var mongoose = require( 'mongoose' );
var User = mongoose.model('userAccounts');

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

/* Retrieve user from JWT token */
var getUser = function( req, res, callback) {
  if(req.session.email) {
      User
          .findOne({email: req.session.email})
          .exec(function(err, user) {
          if(!user) {
              console.log("user not found");
          } else if(err) {
              console.log(err);
          }
          else {
              callback(req, res, user.firstname);
          }

      });
  }
  else {
      console.log("User not found");
  }
};

/* Wrapper around rendering activity page, might enhance for future DB interactions */
module.exports.activityhome = function( req, res ) {

    //console.log(req.body); // this body is empty after redirection why ?
    // this line of code is added a consequence of PRG since when activity page is being get token is already present hence this page will get cached which we dont want
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    getUser( req, res, function( req, res, username) {
        var requestOptions, path;
        path = "/api/school";
        requestOptions = {
            url:'http://localhost:3000' + path,
            method: "GET",
            json: {}
        };
        request(requestOptions, function(err, response, body){
            if (err) {
                console.log(err);
            }
            else if (response.statusCode == 200) {
                body.username = username;
                renderActivityPage(req, res, body);
            }
            else {
                console.log(response.statusCode);
            }
        });
    });

};

/* Simple function which renders the activity page */
var renderActivityPage = function(req, res, body) {
    /*var programList = [];
    for (var i=0; i < body.length; i++) {
        programList.push(body[i].Program);
    }*/
    res.render('activity', {title : 'ActivityHome', "username": body.username, "program": body.schoollist , "location": ['UNITED STATES', 'INDIA'], "schools": ['Georgia Tech', 'University of Texas, Austin']});
};