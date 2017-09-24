const express = require('express')
const mongoose = require('mongoose')
const models = require('./models')
const bodyParser = require('body-parser')
const expressGraphQL = require('express-graphql')
const databaseURL = 'mongodb://localhost/e2-left-app-draft'
const schema = require('./schema/schema')

const app = express();

mongoose.connect(databaseURL, { useMongoClient: true })

// Get all of the users
// User.find({}, (err, users) => {
//   if (err) return console.log(err);
//   return console.log(users);
// });

app.use(bodyParser.json())
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}))

app.listen(4000, () => {
  console.log('Listening');
})

module.exports = app;
