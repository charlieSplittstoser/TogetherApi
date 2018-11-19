var express = require('express');
var router = express.Router();

router.get('/:userId', function(req, res, next) {
	var userId = req.params.userId;
	connection.query('SELECT * from User WHERE id=' + userId, function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
  	});
});

/* GET users listing. */
router.get('/', function(req, res, next) {
	connection.query('SELECT * from User', function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
  	});
});

// login
router.post('/login',function(req,res){
	connection.query('SELECT * FROM User WHERE email=\'' + req.body.email + '\';',
		function (error, results, fields) {
		if(error){
				res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
				//If there is error, we send the error in the error section with 500 status
		} else {
			console.log(results[0]);
			if (results[0] != null && results[0].password == req.body.password) {// check if there is a user returned and the password matches

				res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
				//If there is no error, all is good and response is 200OK.
			} else {// duplicate user trying to make account with user or the password is incorrect
				res.send(JSON.stringify({"status": 500, "error": null, "response": ""}));
			}
		}
	});
});

// get user by email
router.get('/userByEmail/:email',function(req,res){
	connection.query('SELECT * FROM User WHERE email=\"' + req.params.email + '\";',
		function (error, results, fields) {
		if(error){
				res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
				//If there is error, we send the error in the error section with 500 status
		} else {
			if (results[0] != null) {// if  user exists get the events
					res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
					//If there is no error, all is good and response is 200OK.
			} else {// user doesn't exist
				res.send(JSON.stringify({"status": 500, "error": null, "response": "No user exists with that email."}));
			}
		}
	});
});

/* Add new user */
router.post('/addUser',function(req,res){
	connection.query('SELECT * FROM User WHERE email=\'' + req.body.email + '\';',
		function (error, results, fields) {
		if(error){
				console.log(1);
				res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
				//If there is error, we send the error in the error section with 500 status
		} else {
			console.log(results[0])
			if (!results[0]) {// if no users exist with that email go ahead
				connection.query('INSERT INTO User (name, password, email) VALUES(\'' + req.body.name + '\', \'' + req.body.password + '\', \'' + req.body.email + '\');', 
				function (error, results, fields) {
					if(error){
						console.log(2);
						res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
						//If there is error, we send the error in the error section with 500 status
					} else {
						var user = [{email: req.body.email, password: req.body.password, name: req.body.name, id: results.insertId}]
						res.send(JSON.stringify({"status": 200, "error": null, "response": user}));
						//If there is no error, all is good and response is 200OK.
					}
				});
			} else {// duplicate user trying to make account with user
				console.log(3);
				res.send(JSON.stringify({"status": 500, "error": null, "response": "Another user has the same email address."}));
			}
		}
	});
});

/* Change Active event for user */
router.put('/changeActiveEvent',function(req,res){
	var activeEvent = req.body.activeEvent;
	var userId = req.body.userId;

	connection.query('SELECT * FROM User WHERE id=' + userId + ';',
		function (error, results, fields) {
			console.log("Test1");
		if(error){
				res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
				//If there is error, we send the error in the error section with 500 status
		} else {
			console.log("Test0");
			if (results[0] != null) {// if  user exists get the events
				console.log("Test2");
				connection.query('UPDATE User SET activeEvent=' + activeEvent + ' WHERE id=' + userId + ';', 
				function (error, results, fields) {
					if(error){
						res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
						//If there is error, we send the error in the error section with 500 status
					} else {
						res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
						//If there is no error, all is good and response is 200OK.
					}
				});
			} else {// user doesn't exist
				res.send(JSON.stringify({"status": 500, "error": null, "response": "No user exists with that userId."}));
			}
		}
	});
});

module.exports = router;