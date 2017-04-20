#getting-started-redux-notes

##First principle
101 of Redux is that you represent your whole application as a single js object. 
This object can, of course, contain any kind of key value pairs. Each one of these will document the *state* of your app at any given moment. For example, if you have a To Do List app then at any one point you may have a list of tasks some of which may be completed, some of which are yet to be completed, you may have a priority parameter to determine where in the list items should appear. All of these parameters can obviously change and Redux will keep track of these changes within the Redux object as well as store these changes. Everything that can change is stored in this object called the *state* or the *state tree*

##Second principle
The second principle of Redux is that the state tree is read only, you can't change the state tree other than by adding to it. You can only add to it by dispatching an action. Dispatching a action may happen through a network request or it may happen through user input. 
The structure of the state tree is up to you. The only requirement is that it has a type key with a value that is not `undifined`. 

##Pure and impure functions
Pure functions are functions which return values that depend completely on the arguments which you pass to that function. They have no observable side effects such as network or database calls. They just calculate a new value. If you call a function with the same set of arguments then you will get the same value returned every time, they are predictable. They do not modify the values passed to them. If you pass an object as an argument to a pure function then it will not modify that object but will create a new object. 
The opposite is true of impure functions. These may alter the parameters of the arguments which you pass to them. Therefore you need to be aware and mindful of when you are using pure and impure functions. 

##Reducer functions
The eye or the view layer is at it's most predictable when it is a pure function of the application's sate. Redux dictates that the state mutations of your app need to be a pure function which takes the previous state of the app and the actions being dispatched and then returns the next state of your application. In any application, no matter how large or small, there will always be one single function which will take the previous and the current state of the application and return the new state. This function has to be pure so it has to return a new object. This may sound slow but it's actually pretty rapid because this function will be able to reference all of the things which did not change from the previous state. 




