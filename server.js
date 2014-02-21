// getting-started.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://@192.168.1.5:27017/test');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!
  console.log("good connection!");
});

//App Port
var port = 8888;

//Schema
var mammalSchema = mongoose.Schema({
    name: String,
    type: String,
    year_extinct: Number
});

var Mammal = mongoose.model('Mammal', mammalSchema);

//Save to DB
var extinted = new Mammal({ 
    name: "New Mammal2",
    type: "String2",
    year_extinct: 2013 
  });

extinted.save(function (err, extinted) {
  if (err) // TODO handle the error
  console.log(extinted);
});



//Express AP

var express = require('express');

app = express();

app.configure(function (){
  app.use(express.bodyParser());
  app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
});

app.get('/', function(req, res) {

//Read from DB
Mammal.find(function (err, mammals) {

  res.type('application/json');
  res.json(mammals);

  if (err) // TODO handle err
  console.log("Error with "+mammals);
});
  


});


app.listen(port);
console.log('Listening on port '+port);