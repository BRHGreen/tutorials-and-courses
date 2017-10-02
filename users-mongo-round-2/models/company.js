const mongoose = require('mongoose');
mongoose.Promise = global.Promise
const Schema = mongoose.Schema

const CompanySchema = new mongoose.Schema({
  name: String,
  description: String,
})

module.exports = mongoose.model('company', CompanySchema)
