var express = require('express');
var router = express.Router();

/* Get event from eventId */
router.get('/:eventId', function(req, res, next) {
	var eventId = req.params.eventId;
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

/* Get event from creatorId */
router.get('/creator/:creatorId', function(req, res, next) {
	var creatorId = req.params.creatorId;
	connection.query('SELECT * from Event WHERE creatorId=' + creatorId, function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
  	});
});

/* Get all events */
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

/* Example post */
router.post('/',function(req,res){
	var creatorId = req.body.creatorId;

  	connection.query('INSERT INTO Event (title, start_date, end_date, location, creatorId, description, public) VALUES(\''
  	 + req.body.title + '\', \'' + req.body.start_date + '\', \'' + req.body.end_date + '\', \'' + req.body.location + '\', ' + req.body.creatorId + ', \'' 
  	 + req.body.description + '\', ' + req.body.public + ');', 
  	  function (error, results, fields) {

	  	if(error){
		  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
		  		//If there is error, we send the error in the error section with 500 status
		} else {
	  			connection.query('INSERT INTO UserEventMapping (event_id, user_id) VALUES(' + results.insertId + ', ' + creatorId + ');', 
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

// update event settings
router.put('/updateEvent',function(req,res){

  	connection.query('UPDATE Event SET title =\'' + req.body.title + '\', start_date=\'' + req.body.start_date + 
  		'\', end_date=\'' + req.body.end_date + '\', location=\'' + req.body.location + '\', creatorId=' + req.body.creatorId +
  		', description=\'' + req.body.description + '\', public=' + req.body.public + ', thumbnail=\'' + req.body.thumbnail +
  		'\', eventCode=\'' + req.body.eventCode + '\' WHERE id=' + req.body.id + ';', 
  	  function (error, results, fields) {

	  	if(error){
		  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
		  		//If there is error, we send the error in the error section with 500 status
			} else {
				res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
				//If there is no error, all is good and response is 200OK.
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
						res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
						//If there is no error, all is good and response is 200OK.
					}
				});
			} else {
				res.send(JSON.stringify({"status": 200, "error": null, "response": "Event does not exist"}));
			}
		}
	});
});

module.exports = router;