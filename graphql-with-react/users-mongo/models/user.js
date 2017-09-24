const mongoose = require('mongoose');
const Schmea = mongoose.Schema

const UserSchema = new mongoose.Schema({
  name: { type: String },
  age: { type: Number }
})

module.exports = mongoose.model('user', UserSchema)
