var express = require('express');
var router = express.Router();

/* Get photos by eventId */
router.get('/:eventId', function(req, res, next) {
	var eventId = req.params.eventId;
	connection.query('SELECT * from Photos WHERE eventId=' + eventId, function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
  	});
});

/* Get photo by photoId */
router.get('/:photoId', function(req, res, next) {
	var photoId = req.params.photoId;
	connection.query('SELECT * from Photos WHERE id=' + photoId, function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
  	});
});

/* Get all photos */
router.get('/', function(req, res, next) {
	connection.query('SELECT * from Photos', function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
  	});
});

/* Example post */
router.post('/login',function(req,res){
	
 	var user_name=req.body.user;
  	var password=req.body.password;

  	console.log("User name = "+user_name+", password is "+password);
  	res.end("yes");
});

module.exports = router;