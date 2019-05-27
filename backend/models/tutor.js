const mongoose = require('mongoose');

const tutorSchema = mongoose.Schema({
  name: { type: String, required: true},
  fieldOfStudy: { type: String, required: false},
  academicBackground: { type: String, required: false },
  price: { type: Number, required: false},
  description: { type: String, required: false},
  tutorImg: {type: String, required: false},
  email: { type: String, required: true},
  phoneNumber: { type: String, required: false}
});

module.exports = mongoose.model('Tutor', tutorSchema);
