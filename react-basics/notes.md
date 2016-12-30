#Intro to React

###1. What is React JS
- It was designed to make creating full stack single page applications simpler.
- One of the key features is the 'virtual DOM'
- React uses a Functional Programming approach over an Object Oriented approach. It creates copies of objets rather than mutating data in existing objects.
- Reading and writing to the DOM is a sure way to slow down your application's speed. JS objects are faster than DOM objects. The React virtual DOM is a JS object, it never reads from the browser's DOM and only writes to it when it has to. This makes everything a whole lot faster.
- When you use `getElementById`, for example, we are reading from the DOM and when we change these elements we are writing to the DOM. It is this activity which slows down your app.
- The React Virtual DOM sits in between the JS logic and the real DOM. The repeated rendering which normally happen in the real DOM only happens in the Virtual DOM and the real DOM is only updated when changes are made.
- Installing the React Detector and React Developer tools in Chrome: This creates an icon next to the URL bar which turns blue when you navigate to a site which uses React. It also adds a "React" tab to your developer tools which allows you to see all of the React elements on the page.

###2. Getting Started
- Adding React to your code: The simplest way to do this is to go to https://facebook.github.io/react/docs/installation.html and copy and paste the two script tags under the "Using CDN" heading. These are the production files with whitespace and comments.
- To render content with react we need to create script tags (or a JS file) and invoke the `ReactDOM.render()` function. This takes two arguments. The first is what we want to create and the second is where we want to put it.
e.g:
```
ReactDOM.render(
  React.createElement("div", null, "Hello World"),
  document.getElementById("react-container")
  );
```
- This is all well and good when we are not creating a lot of elements but if you were to create an unordered list with several list items it would get very messy. It might look something like this:
```
ReactDOM.render(
  React.createElement("ul", null,
    React.createElement("li", null, "Item 1"),
    React.createElement("li", null, "Item 2"),
    React.createElement("li", null, "Item 3")),
  document.getElementById("react-container")
  );
```
This would work but, for obvious reasons, it is not a road you want to go down.
So good old Zuckerberg gave us JSX so we could deal with it. It's basically JS in XML form but we will need to do use Babel to transpile to get it to work. If we try to render JSX without then we get an 'unexpected token' error.

- You can go to https://cdnjs.com/libraries/babel-core/5.8.34 and copy the link into script tags in your Index.html.
- This version of Babel (5.8) includes an in-browser transpiler (version 6 does not as far as I can make out). In-browser transpiling is *slow* so it's not advised in production but it's the quickest way to get it working. We'll be using WebKit later to manage transpiling.

###3. React Components
- When we think of React applications we should be thinking about a collection of components. Components are small UI elements that display data as it changes over time. These components are composed together and nested inside of one another to create entire user interfaces. Websites can use React for all of their user interface or just bits and pieces of it.
- So a site which uses a lot of React can have entire pages which are react components. Inside these pages will be other nested components.
- As a convention React components are named in upper camel case like so:
`var MyComponent = React.createClass({//code goes here})`
- There are three ways of creating a React component. You can use the `React.createClass` syntax but you can also use the ES6 class syntax like so:
`class MyComponent = extends React.component {//code goes here}`

1. createClass:
```
var MyComponent = React.createClass({
  render() {
    return <div>
      <h1>Hello World</h1>
      <p>React component syntax one</p>
    </div>
  }
})
```

2. Using ES6 classes:
```
class MyComponent extends React.Component {
  render() {
  return <div>
      <h1>Hello World</h1>
      <p>React component syntax two</p>
  </div>
  }
}
```

3. Using stateless functional component:
```
const MyComponent = () => {
  render() {
  return <div>
      <h1>Hello World</h1>
      <p>React component syntax two</p>
  </div>
  }
}
```
All of these functions will return the JSX specified in the `render` function but for all the aforementioned syntaxes you will need to use the `.render` method on the ReactDOM like so:
```
ReactDOM.render(<MyComponent />,
    document.getElementById('react-container'))
```
**note:** it is worth mentioning a couple of things.
Firstly, when creating a component you *have to* put the opening JSX tag in the `render` function on the same line as the `return`
Secondly, These will not create elements. You need an existing element for the `render` method used on the ReactDOM to read and write to. In aforementioned it is a div with the id 'react-container'.


###4.Props and State
- This is where we come to use React for dynamic content. Instead of writing out the JSX we'll be rendering in the function where we create the component, we can just grab the data using `{this.props.text}`.
Those two arguments which the `ReactDOM.render()` method takes, i.e. what it will render followed by where it will render it, the first argument will now be the JSX instead of the const or var `MyComponent`. Also note React always wants to render one element so we'll have to wrap our content in a div Like so:
```
ReactDOM.render(<div>
  <MyComponent text="Hello World"/>
  <MyComponent text="Ahoy World"/>
  <MyComponent text="Hey, World, is that you? World? ....hello?"/>
  </div>,
    document.getElementById('react-container'))
```
  
