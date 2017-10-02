const express = require('express')
const mongoose = require('mongoose')
const expressGraphQL = require('express-graphql')
const models = require('./models')
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser')
const schema = require('./schema/schema')

const app = express();

const databaseURL = 'mongodb://localhost/users'

mongoose.Promise = global.Promise;

mongoose.connect(databaseURL, { useMongoClient: true })
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));


app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'aaabbbccc',
  store: new MongoStore({
    url: databaseURL,
    autoReconnect: true
  })
}));

app.use(bodyParser.json())
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}))

app.listen(4000, () => {
  console.log('Listening');
})

module.exports = app;
