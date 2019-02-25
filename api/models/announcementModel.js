var mongoose = require('mongoose');
//var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var announcementSchema = new Schema({
    nw_content: { type: String, required: true},
    nw_status: { type: String, default: "active"},
    actual_date: {type: Date, required: true},
    date_posted: {type: Date, required: true},
    chapter: {type: mongoose.Schema.Types.ObjectId, ref: 'chapter', required: true},
},{ collection: 'news_feed' });

module.exports = mongoose.model('Announcements', announcementSchema);