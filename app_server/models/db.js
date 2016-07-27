var mongoose = require( 'mongoose');

var dbURI = 'mongodb://localhost/grad-world';
if (process.env.NODE_ENV == 'production') {
    dbURI = process.env.MONGOLAB_URI;

}
mongoose.connect(dbURI);

/*Connection monitoring functions*/
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected to ');
});


/* Discoonect from MongoDB once application exits */

gracefulShutdown = function(msg, callback) {
    mongoose.connection.close( function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};

// For app termination
process.on('SIGINT', function(){
   gracefulShutdown('app termination', function(){
      process.exit(0);
   });
});