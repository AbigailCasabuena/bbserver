var mongoose = require('mongoose');
//var bcrypt   = require('bcrypt-nodejs');

var imgSchema = mongoose.Schema({
    path: { type: Array, required: true},
},{ collection: 'img' });

module.exports = mongoose.model('Images', imgSchema);