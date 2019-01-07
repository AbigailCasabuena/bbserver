var mongoose = require('mongoose');
//var bcrypt   = require('bcrypt-nodejs');

var announcementSchema = mongoose.Schema({
    nw_content: { type: String, required: true},
    nw_status: { type: String, default: "active"},
    actual_date: {type: Date, required: true},
    date_posted: {type: Date, required: true},
},{ collection: 'news_feed' });

module.exports = mongoose.model('Announcements', announcementSchema);