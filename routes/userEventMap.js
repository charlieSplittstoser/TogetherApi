var express = require('express');
var router = express.Router();

router.get('/:eventId', function(req, res, next) {
	var eventId = req.params.eventId;
	connection.query('SELECT * from UserEventMapping WHERE event_id=' + eventId, function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
  	});
});

router.post('/join',function(req,res){
connection.query('SELECT id FROM Event WHERE id=\'' + req.body.eventId + '\';',
		function (error, results, fields) {
		if(error){
				res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
				//If there is error, we send the error in the error section with 500 status
		} else {
			if (results[0] != null) {
				connection.query('INSERT INTO UserEventMapping (event_id, user_id) VALUES(' + req.body.eventId + ', ' + req.body.id + ');', 
				function (error, results, fields) {
					if(error){
						res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
						//If there is error, we send the error in the error section with 500 status
					} else {
						res.send(JSON.stringify({"status": 200, "error": null, "response": null}));
						//If there is no error, all is good and response is 200OK.
					}
				});
			} else {
				res.send(JSON.stringify({"status": 200, "error": null, "response": "Event does not exist"}));
			}
		}
	});
});

router.post('/invite',function(req,res){
	var eventId = req.body.eventId;
	connection.query('SELECT id FROM User WHERE email=\'' + req.body.email + '\';',
		function (error, results, fields) {
		if(error){
				res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
				//If there is error, we send the error in the error section with 500 status
		} else {
			connection.query('INSERT INTO UserEventMapping (event_id, user_id) VALUES(' + eventId + ', ' + results[0].id + ');', 
				function (error, results, fields) {
				if(error){
					res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
					//If there is error, we send the error in the error section with 500 status
				} else {
					res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
					//If there is no error, all is good and response is 200OK.
				}
			});
		}
	});
});

router.delete('/', function(req, res) {
	connection.query('DELETE FROM UserEventMapping WHERE user_id=' + req.body.user_id + ' AND event_id=' + req.body.event_id + ';',
		function (error, results, fields) {
		if(error){
			res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
			//If there is error, we send the error in the error section with 500 status
		} else {
			res.send(JSON.stringify({"status": 200, "error": null, "response": null}));
			//If there is no error, all is good and response is 200OK.
		}
	});
});

module.exports = router;