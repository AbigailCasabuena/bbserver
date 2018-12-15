var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var responseSchema = new Schema({
    event_id: {type: ObjectId, required: true},
    user_id: {type: ObjectId, required: true},
    response: {type: String, required: true},
},{ collection: 'events_response' });


module.exports = mongoose.model('ResponseModel', responseSchema);