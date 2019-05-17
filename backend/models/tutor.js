const mongoose = require('mongoose');

const tutorSchema = mongoose.Schema({
  name: { type: String, required: true},
  fieldOfStudy: { type: String, required: true},
  academicBackground: { type: String, required: true },
  price: { type: Number, required: true},
  description: { type: String, required: false}
});

module.exports = mongoose.model('Tutor', postSchema);
