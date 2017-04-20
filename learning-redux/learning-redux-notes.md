#Learning Redux Notes

###Redux 101 - introduction/what is Redux
- The creator of Redux, Dan Abramov, signed up to speak about developer tools at a React conference in 2015 and in preperation for this conference ended up creating Redux. This is what Dan Abramov has jokingly reffered to as Talk-Driven-Development (megalolz)
- Flux is a design pattern developed by Facebook to provide an alternative to MVC, MVP and MVVM, these are all variations on the 'model-view-controller' design pattern.
- The fundamental difference between the Flux design pattern and MVC is that data flows in one direction. With MVC making changes to models can have unpredictable effects on views (unless you are *really* on top of you code-base).
- As the control flow is unidirectional in Redux everything starts and ends at the same point:
`action => dispatcher => store => view`
When the user makes a change in the view the process goes back to that start i.e. action.
- Redux is a Flux implementation. It's not Flux, it is 'Flux like'
- The key difference between the Flux and Redux it that, While with Flux there can be multiple 'stores', with Redux there can only ever be one. 'The single source of truth'
- The 'store' is a single object with all of the data for the views stored inside of it. Instead of creating modularity by breaking down the data in the store into different objects, the data is accessed by different functions. In short a Redux app is built using functional programming.
- When talking about functional programming in Redux there are three main points to note:
1. Use of pure functions - These are functions that do not create side effects. Everything the function needs to operate is sent as arguments and a new result is returned. Pure functions do not change any of their arguments or any global variables. They just use their information to create a new result.
2. Immutability - We do not want our variables and objects to change.
3. Composition - This refers to the technique of using one function's output as another function's input. So the values returned by one function become the arguments of the next function until we have the value which we are looking for.

- In Redux 'Composition' is used in the store until we then have the value which we want and send it to the view. These functions are known as 'reducers'


###Plan a Redux app 01_03
- First we need to identify all of the actions which we will need our app to perform.
- Next we need to store all of these actions in a files called 'constants'. We'll create an object set to a cont called 'constants' and create a key value pair for all of our actions.
- The value of each action will simply be a string of the key. This is mostly so that JS will throw an error if we mistype an action.
- In this lesson we have created two of the three main components which are required for a Redux app: the Actions and the State. Next up we'll be building the Reducers which will allow us to link these up.

##Understanding Reducers

###Run Redux with Babel-node
