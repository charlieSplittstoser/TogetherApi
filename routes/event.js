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

router.get('/testPermission/:eventId/:userId',function(req,res){
	var eventId = req.params.eventId;
	var userId = req.params.userId;

	connection.query('SELECT * FROM Event WHERE id=' + eventId + ';',
		function (error, results, fields) {
		if(error){
				res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
				//If there is error, we send the error in the error section with 500 status
		} else {

			if (results[0] != null) {
				if(results[0].public == true){// default access
					res.send(JSON.stringify({"status": 200, "error": null, "response": "valid"}));
					return;
				}
				// private must make another query to check


				connection.query('SELECT * FROM UserEventMapping WHERE user_id=' + userId + ' AND event_id=' + eventId + ';', 
				function (error, results, fields) {
					if(error){
						res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
						//If there is error, we send the error in the error section with 500 status
					} else {

						if (results[0] != null && results[0] != undefined) 
							res.send(JSON.stringify({"status": 200, "error": null, "response": "valid"})); // user is mapped to private event
						else
							res.send(JSON.stringify({"status": 401, "error": null, "response": "invalid"})); // user not invited to event

						//If there is no error, all is good and response is 200OK.
					}		
				});
			} else { // event doesn't exist
				res.send(JSON.stringify({"status": 409, "error": null, "response": "Event does not exist"}));
			}
		}

	});
});

/* Get all events for a user */
router.get('/userEvent/:userId',function(req,res){
	var userId = req.params.userId;

	connection.query('SELECT E.* FROM Event E, UserEventMapping U WHERE U.user_id =' + userId + ' AND U.event_id = E.id;', 
	function (error, results, fields) {
		if(error) {
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
			//If there is error, we send the error in the error section with 500 status
		} else {
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
			//If there is no error, all is good and response is 200OK.
		}
	});
});

router.delete('/:eventId', function(req, res) {
	connection.query('DELETE FROM Event WHERE event_id=' + eventId + ';',
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