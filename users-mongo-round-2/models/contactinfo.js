const mongoose = require('mongoose');
mongoose.Promise = global.Promise
const Schema = mongoose.Schema

const ContactInfoSchema = new mongoose.Schema({
  tel: Number,
  email: String,
})

module.exports = mongoose.model('contactinfo', ContactInfoSchema)
