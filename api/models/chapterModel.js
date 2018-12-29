var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var chapterSchema = new Schema({
    chapter_name: {type: String, required: true}
},{ collection: 'chapter' });


module.exports = mongoose.model('chapter', chapterSchema);