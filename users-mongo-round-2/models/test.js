const mongoose = require('mongoose');
mongoose.Promise = global.Promise
const Schema = mongoose.Schema

const TestSchema = new mongoose.Schema({
  test1: String
})

module.exports = mongoose.model('test', TestSchema)
