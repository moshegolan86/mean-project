const mongoose = require('mongoose');


var admin = mongoose.Schema({
  email: { type: String, required: true},
  password: { type: String, required: true, select: false},
  isAdmin: { type: boolean, required: false}

});

module.exports = mongoose.model('Admin', admin);
