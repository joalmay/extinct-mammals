/* The API controller
   Exports 2 methods:

*/
var Mammal = require('./Mammal.js');
 
exports.post = function(req, res) {
      console.log(req.body);

  var extinted = new Mammal({
    name: req.body.name,
    type: req.body.type,
    year_extinct: req.body.year_extinct 
  });

  //Save in DB
  extinted.save(function (err, extinted) {
  if (err) // TODO handle the error
  console.log(err, extinted);
  });

  //Express Send
  res.send("Posted: " + extinted); 
};
 
exports.list = function(req, res) {
	  //Read from DB
  Mammal.find(function (err, mammals) {
    res.type('application/json');
    res.json(mammals);

    if (err) // TODO handle err
      console.log("Error with "+mammals);
  });

};

// GET /mammals/:type - e.g. use http://127.0.0.1:8888/mamals/Rodents
exports.typelist = function(req, res) {

	var type=req.param('type');

	  //Read from DB
  Mammal.find({"type":type}, function (err, mammals) {
  	
    res.type('application/json');
    //Sort by Year
    res.json(mammals);

    if (err) // TODO handle err
      console.log("Error with "+type+" and:"+mammals);
  })
};



// GET /mammals/:type - e.g. use http://127.0.0.1:8888/mamals/Rodents
exports.orderedTypeList = function(req, res) {

	var type=req.param('type');

	  //Read from DB
  Mammal.find({"type":type}, function (err, mammals) {
  	
    res.type('application/json');
    //Sort by Year
    res.json(mammals.sort("year"));

    if (err) // TODO handle err
      console.log("Error with "+type+" and:"+mammals);
  })
};

