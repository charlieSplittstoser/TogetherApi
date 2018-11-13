var express = require('express');
var router = express.Router();

router.get('/:eventId', function(req, res, next) {
	var userId = req.params.userId;
	connection.query('SELECT * from Event WHERE id=' + eventId, function (error, results, fields) {
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
	connection.query('SELECT * from Event', function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
  	});
});

router.post('/login',function(req,res){
	
 	var user_name=req.body.user;
  	var password=req.body.password;

  	console.log("User name = "+user_name+", password is "+password);
  	res.end("yes");
});

module.exports = router;