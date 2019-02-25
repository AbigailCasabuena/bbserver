var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var bloodStockSchema = new Schema({
    blood_group: {type: String, required: true},
    chapter: {type: mongoose.Schema.Types.ObjectId, ref: 'chapter', required: true},
    num_stock: {type: Number, required: true},
    blood_component: {type: String, required: true},
    reserved_stock: {type: Number, required: true},
    remaining_stock: {type: Number, required: true},
    blood_type:  {type: String, required: false},
    rh_factor: {type: String, required: false},
    posted: {type: Boolean, required: false},
    date_posted: {type: String, required: false}
},{ collection: 'blood_stock' });


module.exports = mongoose.model('BloodStock', bloodStockSchema);

/**
 * Blood inventories 
-blood group(A,O,AB,B)
-RH Factor(+,-)
-combine(A_negative,A_positive)
//-blood component 
//-num_stock
-branch_id
//-reserved_stock(data type: int)
//-remaining stock
-posted(for critical status data type boolean)
-date posted
 */