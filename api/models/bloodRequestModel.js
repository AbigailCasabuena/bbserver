/*var mongoose = require('mongoose');

var bloodRequestSchema = mongoose.Schema({
    requester_id: { type: String},
    price: { type: Number, required: true}
},{ collection: 'products' });




module.exports = mongoose.model('BloodRequests', bloodRequestSchema);*/

var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var bloodRequestSchema = new Schema({
    requester_id: {type: ObjectId, required: true}, 
    patient_name: {type: String, required: true},
    number_bags: {type: Number, required: true},
    date_needed: {type: Date, required: true},
    date_requested: {type: Date, required: true},
    request_status: {type: String, required: true},
    chapter_id: {type: ObjectId, required: true}, 
    facilitator_id: {type: ObjectId, required: true}, 
    //String muna (image)
    //request_form: {}
});