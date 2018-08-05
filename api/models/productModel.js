// load the things we need
var mongoose = require('mongoose');
//var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var productSchema = mongoose.Schema({
    name: { type: String},
    price: { type: Number}
},{ collection: 'products' });




module.exports = mongoose.model('Products', productSchema);