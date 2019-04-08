const mongoose = require('mongoose');


var user = mongoose.Schema({
  email: { type: String, required: true},
  password: { type: String, required: true, select: false},
  firstName: { type: string, required: true},
  lastName: { type: string, required: true},
  phoneNumber: { type: phoneNumber, required: true},
  img: {type: Image, required: false},

  isAdmin: { type: boolean, required: false}

});

module.exports = mongoose.model('User', user);

