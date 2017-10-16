// router.js authenticates for routs needing authentication and then translate route to function call

const passport = require('passport'), // passport to authenticate via cookie or jwt
	passportService = require('./services/passport'), // create and register passport auth strategies
	Auth = require('./controllers/authentication'), // signup and login using mongo, bcrypt, and jwt
	requireAuth = passport.authenticate('jwt', { session: false }), // any route requiring authentication
	requireLogin = passport.authenticate('local', { session: false }); // any route requiring signon

// export from here and import into index.js to get access to route
module.exports = function(app) {
	// get request routs
	app.get('/', requireAuth, function(req, res) { // basic route needing authentication 
    	res.send({ message: 'This route has been authorized via jwt token' });
  	});
	app.get('/noneed', function(req, res) {
		res.send({ message: 'This route does NOT need authorization'});
	});
	app.get('/authorize', requireAuth, function(req, res) {
		res.send({ message: 'The /authorize route has been authorized by jwt token'});
	});
	app.get('/users', requireAuth, Auth.getUsers);

  // routs for post requests 
  app.post('/create-account', Auth.createAccount); // the signup function checks db and adds them with bcrypted pass returns jwt
  app.post('/login', requireLogin, // requireLoginin checks that they have account and password matches
  	Auth.login); // then returns jwt																
}
