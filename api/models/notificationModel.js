var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var notificationSchema = new Schema({
    user_id: {type: String, required: false},
    content: {type: String, required: true},
    type: {type: String, required: true},
    content_id: {type: String, required: true},
    date_time: {type: Date, required: true},
    //chapter_id: {type: ObjectId, required: false, ref: 'chapter'}, 
    user_type: {type: String, required: false},
},{ collection: 'notifications' });


module.exports = mongoose.model('Notification', notificationSchema);