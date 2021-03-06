var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var userSchema = new Schema({
    user_firstname: {type:String, required: true},
    user_middlename: {type:String, required: false},
    user_lastname: {type:String, required: true},
    user_username: { type: String, required: true, unique: true},
    user_emailAdd: {type: String, required: true, unique: true, match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/},
    //user_emailAdd: {type: String, required: true, unique: true, match: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/},
    user_contactNum: {type: String, required: true},
    user_password: { type: String, required: true},
    donated_before: {type: Boolean, required: true},
    //verification_code: {type: String, required: false},
    user_deferral_status: {type: String, required: false},
    user_defdate: {type: Date, required: false},
    user_image: {type: String, required: false},
    bloodbank_array: {type: Array, required: false},
    user_gender: {type: String, required: false},
    user_birthday: {type: Date, required: false},
    is_Active: {type: Boolean, default: false},
    donations_updated: {type: Boolean, default: false},
    user_bloodtype: {type: String, required: false},
    //web
    user_type: {type: String, required: true},
    chapter_id: {type: ObjectId, required: false, ref: 'chapter'}, 
},{ collection: 'user_mobile' });


userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('user', userSchema);