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
Firstly, when creating a component you *have to* put the opening JSX tag in the `render` function on the same line as the `return`. It is best practice to put the elements which you want to render in parentheses (this is mentioned in section 4.2).
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
- Now we can also use `{this.props.children}`. So far we have used a self closing tag within the JSX. If we use a separate closing tag we can then access the children within this element. For example:

```
ReactDOM.render(<div>
  <MyComponent text="Hello World">
  Yo
  </MyComponent>
  <MyComponent text="Ahoy World">
  Righto
  </MyComponent>
  <MyComponent text="Hey, World, is that you? World? ....hello?">
  Crumbs
  </MyComponent>
  </div>,
    document.getElementById('react-container'))
```
Now we can use the `{this.props.children}` to render the content between the MyComponent tags.

####Handling events 04_02
- You have to treat JSX differently to html. For example when you want to give a JSX element a class name you would use this syntax: `<div className="note">`

- As well as returning content to render with in the React Class we can also add functions. For example, here we have a button with an event listener on it. It be part of the JSX which will be returned in the `render` section:
`<button onClick={this.edit}>EDIT</button>`
We have also put a function (or method maybe?) called `edit` within in the same class: `edit() {alert("Editing Note")}` so when we hit the edit button this function is invoked.

####Using states 04_03
- We're going to make a checkbox which has two states (obviously). This is the JSX we'll be returning:

```
<input type="checkbox"
        onChange={this.handleCheck}
        defaultChecked={this.state.checked}/>
<p>This box is {msg}</p>
```
Within the same class we have methods various methods (check the code in 04_03) which are being invoked when box is checked. We also have dynamic content within the <p> which changes depending on the state of the checkbox.

####Adding State to the note component 04_04
- In this lesson (check code in 04_04 directory) we did some refactoring and added 'states'. Essentially code has been divided into different methods which render different JSX depending on which methods are invoked. These methods are attached to event listeners on the buttons.
- In the following lesson we are going to add some functionality which will actually allow us to edit the text displaying on the note.

####Using refs 04_05
- The new key word here is `refs`. Essentially it allows us to access the value in UI elements so when the user makes changes to a note and hits 'save' we will actually be able to update the content in the text area on the note.
- basically if you cannot access the value of a DOM node using `props` or `state` then `refs` may be what you need.

####PropTypes 04_06
- Prop types are great. They let you do error handling, tell the user if they have failed to fill out a required field etc. Essentially you achieve this by making an object called `propTypes` in your React class in which you put your conditional statements for what datatypes you're expecting.
- PropTypes are optional but they are obviously a good idea as checking for datatypes lessens the chance of your app breaking.

####Adding Child Elements 04_07
- The codebase is starting to get long-ish now. We still have just one div in the HTML to which we are adding all of our content. We have two React classes, one for the notes and one for the board. Next up is getting a bunch of notes with different content appearing on our board.
- Within the board class we have added a `getInitialState` method inside of which we have an array with the text which we will be displaying on the notes. This'll mean we have access to this in the initail state (surprizingz?)
- What we do here is a similar concept to ng-repeat. In React we do this with a `map` method. This is what is returned in the render method:

```
<div className='board'>
{this.state.notes.map((note, i) => {
  return <Note key={i}>{note}</Note>
})}
</div>
```
- Note: the map method in React calls the function for each element in an array.

###Enhancing Components

####Updating and removing notes 05_01
- In this section we are going to make the notes into an array of objects
rather than just an array of strings

**this is tricky. You must revise**

####Adding new notes 05_02

####Keys 05_03
- When rendering our note components we pass a key property to out component when it is part on an array of children, this is passed in the JSX in the render function:

```
eachNote(note) {
    return (<Note key={note.id}
                  id={note.id}
                  onChange={this.update}
                  onRemove={this.remove}>
              {note.note}
            </Note>)
}
```
Our board is the parent and it's note children all contain this key property.
If we do note include the key property here then when we add a note we'll get an error. This is because the key is a unique ID for that array element and the browser needs to keep track of these.

####Component lifecycle (no code for this one)
- The component lifecycle provides hooks for creation, lifetime and teardown components. These are methods and they allow you to add libraries, load data, and a bunch of other stuff, at very specific times.

*We have used some mounting methods already:*
1. getInitialState - Will be called once and will set the default state.
2. componentWillMount - It is the last chance to effect the component before the render.
3. Render - It is the only required method. Cue is in the name.
4. ComponentDidMount - Will be fired after the render.

*Updating methods:*
1. componentWillReceiveProps - once called we will be able to change the object and effect state.
2. shouldComponentUpdate, componentWillUpdate - invoked right before rendering and are often used for optimisation. We only call them if something has changed.
3. render - (again) part of the updating lifecycle
4. componentDidUpdate - fires right after the DOM has been updated.

- componentWillUnmount - called right before the component is unmounted. Helps us clean up DOM elements and invalidate timers.

####Mounting components 05_05
- As we found out in the previous lesson, lifecycle methods make it easy for us to interact  with the DOM at specific points in time. So if you want to stop the page loading until the user has, say, clicked on a dialogue box or you want to remove elements from the DOM when they are clicked this is all super easy.

####Setting properties 05_06
- Essentially you can set your styling of element to methods  within the React Class. The advantage of doing this over using CSS is that you can apply and reuse styling on elements which don't share classes or id's (not that you would EVER give more than one element the same ID)

####Updating components 05_07
- Just a bunch more lifecycle stuff. See code for deetz.

####Adding lifecycle methods to the bulletin board 05_08
- Loads of stuff here. It's worth noting that we used an API, so that's nice, and also added the React draggable library.
- React draggable is actually really easy to use:
1. Identify what it is you want to drag and where in the code this element is returned. In this case it the point where the note is rendered.
2. Wrap the everything which will be returned `<ReactDraggable>` tags
3. now wrap everything, including the tags, in parentheses.
4. now put braces around the expression (but inside the tags)
....should work.

####Using create-react-app
- The way we created this app is pretty old school. We can use NPM to install create-react-app globally. We then run the command
`create-react-app name-of-app` and it'll run everything we need in order to get started with a React project.
- Once this is done we `cd` into the directory which has been created for us (obviously this has the name of the app you passed into the build command) and run `npm start`. This'll run the app on localhost 3000.
- So as expected this pretty much includes everything you need to build an app. It also allows you use a `npm run build` command which gives you a production ready build (minifies your code etc)

**Check out Flux. It the good people at React recommend it as an alternative to the MVC structure**

**Also check out React Native. It'll only bloody build you a mobile app**
