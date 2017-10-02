create an express server

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

- We need an `index.html` with the an element to which our React component(s) can render

- we'll also want to install `webpack-dev-server` to get things running and get hot reload going. This can be run using
` ./node_modules/webpack-dev-server/bin/webpack-dev-server.js --progress --colors`
..which, yeah, does seem a bit long. I'll figure out another way.
