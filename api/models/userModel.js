var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    user_name: {type:String, required: true},
    user_username: { type: String, required: true, unique: true},
    user_emailAdd: {type: String, required: true, unique: true, match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/},
    user_contactNum: {type: String, required: true},
    user_password: { type: String, required: true},
    donated_before: {type: Boolean, required: true},
    verification_code: {type: String, required: false},
    user_deferral_status: {type: String, required: false},
    user_defdate: {type: Date, required: false},
    user_image: {type: String, required: false},
    bloodbank_array: {type: Array, required: false},
    user_gender: {type: String, required: true},
    user_birthday: {type: Date, required: true},
},{ collection: 'user_mobile' });


userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Users', userSchema);