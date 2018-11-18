var mongoose = require('mongoose');

var tokenSchema = new mongoose.Schema({
    user_username: { type: String, required: true,},
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
},{ collection: 'verification_token' });

module.exports = mongoose.model('VerificationToken', tokenSchema);
