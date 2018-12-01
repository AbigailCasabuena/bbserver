var mongoose = require('mongoose');
//var bcrypt   = require('bcrypt-nodejs');

var productSchema = mongoose.Schema({
    name: { type: String, required: true},
    price: { type: Number, required: true},
    productImage: {type: String, required: true}
},{ collection: 'products' });




module.exports = mongoose.model('Products', productSchema);