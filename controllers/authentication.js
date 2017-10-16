// authentication controller used by router.js
 
const jwt = require('jwt-simple'), // creates and verifies jwt
  User = require('../models/user'),  // defines user table
  jwtConfig = require('../configs/jwt_config'); // defines secret

function createToken(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, jwtConfig.secret);
};

exports.createAccount = function(req, res, next) {
  const email = req.body.email,  // DRY
    password = req.body.password; 
  if (!email || !password) { // empty field test
     return res.status(422).send( // 422 = unprocessable data
      { error: 'You must provide email and password'}
    );
  }
  User.findOne({ email: email }, function(err, existingUser) { // user in db?
    if (err) { return next(err); }
    if (existingUser) {
       return res.status(422).send({ error: 'Email is in use' });
    }
    const user = new User({ email: email, password: password });
    user.save(function(err) { // save user to db
      if (err) { return next(err); }
      res.json({ token: createToken(user) }); // return jwt
    });
  });
};

exports.login = function(req, res, next) { // user already verified
  res.send({ token: createToken(req.user) }); // return jwt
};

exports.getUsers = function(req, res, next) {
  User.find({}, function(err, docs) {
    if (err) { return next(err); }
    res.json(docs);
  });

};

