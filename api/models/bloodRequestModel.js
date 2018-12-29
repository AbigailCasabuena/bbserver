var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var bloodRequestSchema = new Schema({
    requester_id: {type: ObjectId, required: true}, 
    patient_name: {type: String, required: true},
    number_bags: {type: Number, required: true},
    //date_needed: {type: Date, required: true},
    date_requested: {type: Date, default: Date.now},
    request_status: {type: String, default: 'pending'},
    chapter_id: {type: ObjectId, required: true, ref: 'chapter'}, 
    facilitator_id: {type: ObjectId, required: false}, 
    is_urgent: {type: Boolean, required: true},
    person_claim: {type: String, required: true},
    request_form: {type: Array, required: false},
},{collection: 'blood_request'});

module.exports = mongoose.model('BloodRequest', bloodRequestSchema);