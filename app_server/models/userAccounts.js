var mongoose = require( 'mongoose' );

var userSchema = new mongoose.Schema({
   email: {type: String, required: true},
   firstname: {type: String, required: true},
   lastname: {type: String, required: true},
   nickname: String,
   education: {type: String, required: true},
   university: {type: String, required: true},
   employer: String,
   jobtitle: String
});

mongoose.model('userAccounts', userSchema);