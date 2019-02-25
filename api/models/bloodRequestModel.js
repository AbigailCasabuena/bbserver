var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var bloodRequestSchema = new Schema({
    requester_id: {type: ObjectId, required: true}, 
    patient_name: {type: String, required: true},
    no_of_bags: {type: Number, required: true},
    //date_needed: {type: Date, required: true},
    date_requested: {type: Date, default: Date.now},
    date_claimed: {type: Date, required: false},
    request_status: {type: String, default: 'pending'},
    chapter_id: {type: ObjectId, required: true, ref: 'chapter'}, 
    facilitator_id: {type: ObjectId, required: false}, 
    is_urgent: {type: Boolean, required: true},
    person_claim: {type: String, required: true},
    request_form: {type: Array, required: false},
    blood_group: {type: String, required: false},
    blood_product: {type: String, required: false},
    receipt_no: {type: String, required: false},
    request_type: {type: String, required: false},
    remarks: {type: String, required: false},
    volume: {type: String, required: false},
    serialCode: {type: String, required: false},
    blood_type:  {type: String, required: false},
    rh_factor: {type: String, required: false},
    hospital: {type: String, required: false},
},{collection: 'blood_request'});

module.exports = mongoose.model('BloodRequest', bloodRequestSchema);

/**
 * Blood Request
//- requester_id
-recipient_firstname
-recipient_lastname
-recipient_middlename
-recipient_contactNum
//-patient_name
//-no_of_bags
//-date_requested
//-date_claimed
//-request_status
(approved,declined,waiting,claimed, expired)
//-chapter_id
//-facilitator_id
//-is_urgent
//-request form(picture)
-blood_group
//-blood_product
//-reciept_no
//-volume
//-serialCode
//-remarks-(Notice for approval or declined)
//-request_type(walk-in, mobile app)
 */