const mongoose = require('mongoose');

const tutorSchema = mongoose.Schema({
  name: { type: String, required: true},
  fieldOfStudy: { type: String, required: true},
  academicBackground: { type: String, required: true },
  price: { type: Number, required: true},
  description: { type: String, required: false},
  tutorImg: {type: String, required: false},
  email: { type: String, required: false},
  phoneNumber: { type: String, required: false}
});

module.exports = mongoose.model('Tutor', tutorSchema);
