const mongoose = require('mongoose');
const Schmea = mongoose.Schema

const UserSchema = new mongoose.Schema({
  firstName: String,
  age: Number,
  companyId: String
})

module.exports = mongoose.model('users', UserSchema)
