- create new dir and run `npm init`
- you'll need to install all of these as dev dependencies:
`npm i
  react
  react-dom
  webpack
  
  babel-loader
  babel-core
  babel-preset-es2015
  babel-preset-react
--save-dev`
- You'll need to tell app where webpack and babel are by including some stuff in the scripts section of your package.json. It should look something like this:
```
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "babel": "babel",
  "webpack": "webpack"
},
```

- next create a webpack.config.js and pop some config code in there. See the document in question for the code and notes.

- now we can create an app.js file, this is where we have told webpack to look for the code it's going to compile. In here we can create our top level react component
