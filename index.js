// index.js is the main starting point of the application
// kicked off starting mongo db in a terminal and then 
// running npm start script in a different terminal

const express = require('express'), // node web framework
	app = express(), // app is instance of express
	mongoose = require('mongoose'), // Mongodb database abstraction layer
  logger = require('morgan'), 	// logging debugging middleware
  cors = require('cors'), // CORS middleware, Cross Origin Resource Sharing
  jsonConverter = require('body-parser'), // conversion to JSON middleware
  http = require('http'), // low level node http lib used to create the server
  router = require('./router'), // the router directs the requests
  port = require('./configs/main'); // port for auth server to listen on
 
// Hook to mongo database - if it doesn't exist create a new one 
mongoose.connect('mongodb://localhost:auth/auth-mern');

// Start the authentication server
const server = http.createServer(app); // creating a server from express
server.listen(port);
console.log('Authentication Server listening on:', port);  

// end point middleware chain
app.use(logger('combined')); // Add logging to terminal
app.use(cors()); // Enable all CORS requests - change to white list for live
app.use(jsonConverter.json({ type: '*/*' }));  // convert to JSON 
router(app);  // pass to router for authentication, business logic, and db access 
