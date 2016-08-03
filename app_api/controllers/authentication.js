var passport = require('passport');
var mongoose = require('mongoose');
var User =  mongoose.model('userAccounts');

var sendJSONresponse = function(res, status, content){
    res.status(status);
    res.json(content);
};

module.exports.register = function(req, res){
    if(!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {
            "message": "All fields are required",
            "body": req.body
        });
        return;
    }

    var user = new User();
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.email = req.body.email;
    user.university = req.body.university;
    user.education = req.body.education;
    user.setPassword(req.body.password);
    
    user.save(function(err) {
       var token;
        if(err) {
            sendJSONresponse(res, 404, err);
        } else {
            token = user.generateJwt();
            sendJSONresponse(res, 200, {
               "token" : token
            });
        }
    });
};

module.exports.login = function(req, res) {
  if(!req.body.email || !req.body.password) {
      sendJSONresponse(res, 400, {
         "message" : "Email and password required"
      });
      return;
  }

  passport.authenticate('local', function(err, user, info) {
     var token;
     if(err) {
         sendJSONresponse(res, 404, err);
         return;
     }

     if(user){
         token = user.generateJwt();
         sendJSONresponse(res, 200, {
            "token": token
         });
     } else {
         sendJSONresponse(res, 401, info);
     }
  })(req, res);

};