// The main application script, ties everything together.
 
var express = require('express');
var mongoose = require('mongoose');
var app = module.exports = express();
//app = express();

//App Port
var port = 8888;
 
// connect to Mongo when the app initializes
mongoose.connect('mongodb://@192.168.1.5:27017/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!
  console.log("good connection!");
});
 
 //Configure Express
app.configure(function (){
  app.use(express.bodyParser());
  app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
});


// set up the RESTful API, handler methods are defined in api.js
var api = require('./api.js');
app.post('/mammals', api.post);
app.get('/mammals', api.list);
app.get('/mammals/:type', api.typeList);
app.get('/mammals/order/:type', api.orderedTypeList);

 
app.listen(port);
console.log("Server listening on port %d", port);

//Save to DB
/*
var extinted = new Mammal({
  name: "New Mammal2",
  type: "String2",
  year_extinct: 2013 
  });

extinted.save(function (err, extinted) {
  if (err) // TODO handle the error
  console.log(extinted);
});

*/




