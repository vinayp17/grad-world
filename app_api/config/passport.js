var passport = require('passport');
var LocalStrategy = require('passport-local');
var mongoose = require('mongoose');
var User = mongoose.model('userAccounts');

passport.use(new LocalStrategy(
    {
        usernameField: 'email'
    },
    function (username, password, done) {
        User.findOne({email: username}, function (err, user) {
            if(err) { return done(err); }
            if(!user) {
                return done(null, false, {
                    message: 'Incorrect username',
                });
            }
            if(!user.validPassword(password)) {
                return done(null, false, {
                    message: 'Incorrect passwprd'
                });
            }
            return done(null, user);
            
        });        
    }
));