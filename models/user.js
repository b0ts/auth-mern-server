// Defines users in the mongo db - User Robo 3T to verify

const mongoose = require('mongoose'), // mongo db abstraction layer
  Schema = mongoose.Schema, // schema defines the fields 
  bcrypt = require('bcrypt-nodejs'); // encrypting and verifying passwords

const userSchema = new Schema({  // fields in table
  email: { 
    type: String, 
    unique: true,   // all emails but be different
    lowercase: true // save as lowercase so goober@gmail.com 
  },                // seen as the same as GOOBER@GMAIL.COM
  password: String
});

userSchema.pre('save', function(next) { // lifecycle pre save function
  const self = this; 
  bcrypt.genSalt(10, function(err, salt) { // salt = random chars for encrypt
    if (err) { return next(err); }
    bcrypt.hash(self.password, salt, null, function(err, hash) {
      if (err) { return next(err); }
      self.password = hash; // replace pw with salt + encrypted pw 
      next(); 
    });
  });
});

// bcrypt pulls salt from encrypted pw and uses it 
// to encrypt candidate pw then compairs the encrypted ones
userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }
    callback(null, isMatch);
  });
}

const User = mongoose.model('User', userSchema);
module.exports = User;
