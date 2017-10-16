
// The passport library can be used to authenticate users based 
// on either cookies or jwt.
const passport = require('passport'), // passport lib authenticates on jwt or cookies
  JwtStrategy = require('passport-jwt').Strategy, // jwt module strategy def 
  ExtractJwt = require('passport-jwt').ExtractJwt, // jwt extraction
  LocalStrategy = require('passport-local'), // username password jwt module
  jwtConfig = require('../configs/jwt_config'), // secret for encryption
  User = require('../models/user'); // mongo db user table fields

const jwtOptions = { // jwt authorization setup
  jwtFromRequest: ExtractJwt.fromHeader('authorization'), // get encoded jwt
  secretOrKey: jwtConfig.secret // secret for decoding
};

const jwtLogin = new JwtStrategy(jwtOptions, // options to decrypt payload 
  function(payload, done) {
  User.findById(payload.sub, function(err, user) { // sub is decrypted user
    if (err) { return done(err, false); } // db error 
    if (user) { // authenticated user exists in db the
      done(null, user); 
    } else { // user not authenticated
      done(null, false);
    }
  });
});

// email password authentication strategy - password is same field name
const localOptions = { usernameField: 'email' }; // map email to usernameField
const localLogin = new LocalStrategy(localOptions, 
  function(email, password, done) { // Use User db to find user instance
    User.findOne({ email: email }, function(err, user) { // is email in db?
      if (err) { return done(err); }  // db error then return it
      if (!user) { return done(null, false); } // not in db so fail
      user.comparePassword(password, function(err, isMatch) { // compare passwords
        if (err) { return done(err); }
        if (!isMatch) { return done(null, false); } // no then fail out
        return done(null, user); // authentication.js loginin uses req.user 
    });                          // passed back by done to create a jwt
  });
});

passport.use(jwtLogin);   // register login strategies with passport
passport.use(localLogin);

