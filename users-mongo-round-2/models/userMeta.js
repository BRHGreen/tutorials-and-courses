const mongoose = require('mongoose');
mongoose.Promise = global.Promise
const Schema = mongoose.Schema

const UserMetaSchema = new mongoose.Schema({
  bio: String,
  location: String,
})

module.exports = mongoose.model('userMeta', UserMetaSchema)
