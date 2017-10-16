This is the source code for the auth-mern-server 

It is a basic authentication server using the MERN stack 
(Mongo db, Express, React, and Node).  

It creates a group of endpoints for: 
a.  Creating a new user account from an email and password.  
b.  Logging In using the email and password.  
c.  Protected data access endpoints via testing JWT (JASON Web Tokens) prior to routing to db access. 
d.  Non protected data access endpoints bypassing JWT testing. 
  
It employs bcrypt encryption for encrypting the user password prior to putting it into the database.  
It also uses bcrypt to perform a comparison between subsequent password entries and the encrypted password in the db.

When a new account is created or the user logs in, a JWT is created and returned.  
The jwt is included in the header of subsequent protected endpoint calls to provide logged in access control.

The endpoints exposed by this server can be accessed by any clients that can produce the correct GET and POST calls.  
For example, the Postman application is used to do basic testing of the authentication server.

I have also written an associated auth_mern_client application.  It is also open sourced on my github account and shows how to use this server for authenticating as well as reading and writing to the mongo database.  
The auth_mern_client was written with expandability in mind, so it is easy to expand both the client and server to provide any functionality necessary in an advanced MERN stack website.

Note: CORS (Cross Origin Resource Sharing) is currently set to allow access from all servers and ports in index.js.  When the authentication server is deployed to live, it should be configured to only allow access from white listed servers and ports.  See CORS doc for white listing details.
https://www.npmjs.com/package/cors

Here are the steps to running the authentication server locally

1.  If node isn't installed, install it.

2.  If npm isn't installed, install it.

3.  If mongo db isn't installed, install it.

4.  In a terminal window navigate to a folder where the server will live.
$ cd ~/code

5.  Clone the github repo

6.  Create a new config jwt_config.js from jwt_config_sample.js 

7.  Change the secret in jwt_config.js, because the sample one is NOT a secret.

5.  In a terminal window run mongo db from command line
$ mongod

6.  In a separate terminal window, navigate to where you cloned to.
For example:
$ cd ~/code/auth_mern_server

7.  Use npm to install the dependencies defined in package.json locally.
$ npm install

8.  Use npm to start the auth server.
$ npm start

9.  Verify that it is running in its terminal window.

10.  Verify that it connected to mongo db in the mongo db terminal window.

11.  Test new user creation by using the Postman program to send a 
POST request to 
localhost:3001/create-account
with a raw JSON (Application/JSON) body of 
{ 
  "email": "testy@gmail.com",
  "password": "goober$1234GOOBER"
}

12.  Send it a second time to verify that you can only have one user with a particular email.

13.  Test user login by using the Postman program to to
send a POST request to 
localhost:3001/login 
with the same raw JSON body that was used for create-account.  
Copy the jwt token returned. 

14.  Test a non authorized route by sending a GET request to: 
localhost:3001/noneed

15.  Test an authorized route (one that needs a jwt token) 
by sending a GET request to: 
localhost:3001/authorize 
Notice: That is returned a failure message

16.  Send a second GET request to: 
localhost:3001/authorize 
with a header key of authorization (all lowercase) 
and value of the jwt token copied previously 
Note:  The jwt token does not have quotes in the value field

17.  Send a third GET request to:
localhost:3001/users
with a header key of authorization (all lowercase) 
and value of the jwt token copied previously.  
Notice that you get all the registered users in the database.

18.  Finally install and run the auth_mern_client software.  
Mongo db should be running in one terminal window, this authentication server running in a second terminal window, and the auth_mern_client software running in a third terminal window.  via:
$ cd auth_mern_client
$ npm install
$ npm start

19.  It will start up and launch itself into a browser window, giving you the basic login, create new account, logout, and display users functionality.  Notice how the menu options change for a logged in user as opposed to a non logged in user and how you need to be logged in to get the user list from the server.

I would like to thank Joshua Slate and Stephen Grinder
for their inspiration for this authentication server. 

[authentication api blog](http://blog.slatepeak.com/refactoring-a-basic-authenticated-api-with-node-express-and-mongo/)

[AdvancedReduxCode](https://github.com/StephenGrider/AdvancedReduxCode)

I would also like to thank the great authors who created the libraries that this server depends on.  It stands on the shoulders of giants!

[Node js](https://github.com/nodejs)

[NPM](https://github.com/npm/npm)

[Mongo db](https://github.com/mongodb/mongo)

[bcrypt-nodejs](https://github.com/shaneGirish/bcrypt-nodejs)

[body-parser"](https://github.com/expressjs/body-parser)

[cors](https://github.com/expressjs/cors)

[express](https://github.com/expressjs/express)

[jwt-simple](https://github.com/hokaccha/node-jwt-simple)

[mongoose](https://github.com/Automattic/mongoose)

[morgan](https://github.com/expressjs/morgan)

[nodemon](https://github.com/remy/nodemon)

[passport](https://github.com/jaredhanson/passport)

[passport-jwt](https://github.com/themikenicholson/passport-jwt)

[passport-local](https://github.com/jaredhanson/passport-local)

Best wishes,
Robert Bourbonnais (b0ts)
