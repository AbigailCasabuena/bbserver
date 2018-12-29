var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var bloodStockSchema = new Schema({
    blood_group: {type: String, required: true},
    chapter: {type: mongoose.Schema.Types.ObjectId, ref: 'chapter', required: true},
    num_stock: {type: Number, required: true},
    blood_category: {type: String, required: true},
    reserved: {type: Number, required: true},
    remaining: {type: Number, required: true},
},{ collection: 'blood_stock' });


module.exports = mongoose.model('BloodStock', bloodStockSchema);