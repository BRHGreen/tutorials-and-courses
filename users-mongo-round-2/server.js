const mongoose = require('mongoose');
mongoose.Promise = global.Promise
const models = require('./models');
const express = require('express');
const expressGraphQL = require('express-graphql');
const bodyParser = require('body-parser');
const schema = require('./schema/schema');

const User = require('./models/contactinfo');

const app = express();

const MONGO_URI = 'mongodb://localhost/users-mongo-round-2'

// Get one User
User.findById("59cee13051638cf6f4437cd0", (err, user) => {
  if (err) return console.log(err);
  return console.log(user);
})

// Get all of the users
// User.find({}, (err, users) => {
//   if (err) return console.log(err);
//   return console.log(users);
// });

mongoose.connect(MONGO_URI, { useMongoClient: true })
mongoose.connection
  .once('open', () => console.log('Connected to Mongo'))
  .on('error', error => console.log('Error connecting to Mongo', error));

app.use(bodyParser.json())
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}))

app.listen(4000, () => {
  console.log('Listening on 4000');
})

module.exports = app;
