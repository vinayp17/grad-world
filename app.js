require('dotenv').load();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('client-sessions');
var jwt = require('express-jwt');

require('./app_api/models/db');
require('./app_api/config/passport');

var routes = require('./app_server/routes/index');
var routesApi = require('./app_api/routes/index');
var users = require('./app_api/models/users');


var app = express();

//error handlers
/*app.use(function(err, req, res, next){
    if(err.name == "UnauthorizedError") {
        res.status(401);
        res.json({"message" : err.name + ": " + err.message});
    }
    next();
});*/

/*app.get('/api/school', jwt({secret: process.env.JWT_SECRET}), function(req,res) {
    if (!req.session.token) return res.sendStatus(401);
    next();
});
*/

app.use(session(
    {
        cookieName: 'session',
        secret: process.env.SESSION_SECRET,
        duration: 30 * 60 * 1000,
        activeDuration: 5 * 60 * 1000,
    }
));

// Catch unauthorized errors
app.use(function(req, res, next) {
    if (!req.session.token)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());

app.use('/', routes);
app.use('/api', routesApi);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var server = app.listen(3000, function() {
    console.log("Server listening at http://"+ server.address() + ':' + server.address().port);
});


module.exports = app;
