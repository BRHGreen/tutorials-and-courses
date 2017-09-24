// using node's inbuild ability to recognise paths
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // all of our development takes place here
  entry: './app.js',
  // everything we do will be compiled into bundle.js
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  watch: true,
  module: {
    loaders: [
      {
        // wepack will try and compile everything in your app. This is where you tell webpack about special cases.
        // `test` is saying anything which is wither js or jsx, use the babel-loader to compile it.
        test: /.jsx?$/,
        // `exclude` is set to the files and directories which we want webpack to skip.
        loader: 'babel-loader',
        exclude: /node_modules/,
        // Presets is telling webpack that we are using es6 and react.
        query: {
          presets: [ 'es2015', 'react' ]
        }
      }
    ]
  }
}
