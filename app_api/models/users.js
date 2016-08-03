var mongoose = require( 'mongoose' );
var crypto = require( 'crypto');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    nickname: String,
    education: {
        type: String,
        required: true
    },
    university: {
        type: String,
        required: true
    },
    employer: String,
    jobtitle: String,
    hash: String,
    salt: String,
});

userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 512, 'sha512');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 512, 'sha512');
  return this.hash == hash;
};

userSchema.methods.generateJwt = function() {  
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            firstname: this.firstname,
            exp: parseInt(expiry.getTime() / 1000),
        }, process.env.JWT_SECRET
    );
};


mongoose.model('userAccounts', userSchema);