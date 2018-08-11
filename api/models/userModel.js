var mongoose = require('mongoose');
//var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    username: { type: String, required: true},
    password: { type: String, required: true}
},{ collection: 'users' });




module.exports = mongoose.model('Users', userSchema);