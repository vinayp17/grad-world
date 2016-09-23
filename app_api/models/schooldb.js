var mongoose = require( 'mongoose' );

var schoolSchema = new mongoose.Schema({
   Degree: {
       type: String
   },
   Program: {
       type: String
   },
   Institute:{
       type: String
   },
   Country: {
       type: String
   },
   State: {
       type: String
   },
   City: {
       type: String
   }
});

mongoose.model('degreeprograms', schoolSchema);