// The Mammal model

var mongoose = require('mongoose')

//Schema
var mammalSchema = mongoose.Schema({
    name: String,
    type: String,
    year_extinct: Number
});

//var Mammal = mongoose.model('Mammal', mammalSchema);
module.exports = mongoose.model('Mammal', mammalSchema);
