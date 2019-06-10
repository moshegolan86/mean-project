const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
  title: { type: String, required: true},
  place: { type: String, required: true},
  eventDate: { type: Date, required: false },
  studentPrice: { type: Number, required: true },
  guestPrice: { type: Number, required: false},
  description: { type: String, required: false}
});

module.exports = mongoose.model('Event', eventSchema);
