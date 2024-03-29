var express = require('express');
var router = express.Router();

router.post('/testUploadPhoto',function(req,res){
  var creatorId = req.body.creatorId;

    connection.query('INSERT INTO test_image (imageData) VALUES(\'' + req.body.imageData + '\');',
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

/* Get photos by eventId */
router.get('/eventPhotos/:eventId', function(req, res, next) {
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
router.get('/photo/:photoId', function(req, res, next) {
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


router.post('/uploadPhoto',function(req,res){
	var creatorId = req.body.creatorId;

  	connection.query('INSERT INTO Photos (eventId, userId, location, date_created, caption) VALUES('
  	 + req.body.eventId + ', ' + req.body.userId + ', \'' + req.body.location + '\', \'' + req.body.date_created + '\', \'' + req.body.caption + '\');', 
  	  function (error, results, fields) {

	  	if(error){
	  			console.log('What up');
		  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
		  		//If there is error, we send the error in the error section with 500 status
		} else {
				var myId = results.insertId;
	  			connection.query('UPDATE Photos SET path = \'image' + results.insertId + '.png\' ' + 'WHERE id=' + results.insertId + ';', 
	  				function (error, results, fields) {
						if(error){
	  						res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  						//If there is error, we send the error in the error section with 500 status
	  					} else {
	  						var photo = [{id: myId, eventId: req.body.eventId, userId: req.body.userId, path: 'image' + results.insertId + '.png', likes: 1, 
	  									  location: req.body.location, date_created: req.body.date_created, caption: req.body.caption}]
  							res.send(JSON.stringify({"status": 200, "error": null, "response": photo}));
  							//If there is no error, all is good and response is 200OK.
	  					}
					});
		}
	});
});

router.post('/upload', function(req, res) {
	console.log('lol');
	var rawImg = req.body.image,
	    //base64Data = rawImg.replace(/^data:image\/png;base64,/, ''),
	    dirpath = '/Users/charliesplittstoser/Desktop/server/TogetherApi/public'
	    imageName = 'picture.png',
	    imageLocation = dirpath + imageName;
  	fs.writeFile(imageLocation, rawImg, 'base64', function(err) {});
});

module.exports = router;