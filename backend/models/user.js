const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

var user = mongoose.Schema({
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true},
  firstName: { type: String, required: true},
  lastName: { type: String, required: true},
  img: {type: String, required: false},
  isAdmin: { type: Boolean, required: false}

});

user.plugin(uniqueValidator);

module.exports = mongoose.model('User', user);

