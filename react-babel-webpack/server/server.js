const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const expressGraphQL = require('express-graphql')
const databaseURL = "mongodb://localhost/e2-left-app-draft"

const app = express()

mongoose.connect(databaseURL, { useMongoClient: true })

if (!databaseURL) {
  throw new Error('You must provide a databaseURL');
}

mongoose.connect(databaseURL)
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error));

app.use(bodyParser.json())
app.use('/graphql', expressGraphQL({
  schema,
  graphql: true
}))

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app
