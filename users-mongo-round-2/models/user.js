const mongoose = require('mongoose');
mongoose.Promise = global.Promise
const Schema = mongoose.Schema

const UserSchema = new mongoose.Schema({
  firstName: String,
  age: Number,
})

module.exports = mongoose.model('user', UserSchema)
