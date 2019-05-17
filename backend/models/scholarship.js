const mongoose = require('mongoose');

const scholarshipSchema = mongoose.Schema({
  title: { type: String, required: true},
  content: { type: String, required: true},
  scholarImg: { type: String, required: false },
  finalDate: { type: Date, required: false},
  publishedDate: { type: Date, required: false},
  scholarFile: { type: String, required: false }
});

module.exports = mongoose.model('Scholarship', scholarshipSchema);
