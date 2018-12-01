var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var notificationSchema = new Schema({
    user_id: {type: String, required: false},
    content: {type: String, required: true},
    type: {type: String, required: true},
    content_id: {type: String, required: true}
},{ collection: 'notifications' });


module.exports = mongoose.model('Notification', notificationSchema);