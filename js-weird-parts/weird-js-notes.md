#JS, The Weird Parts - Notes


###terms
- Syntax parser: a program which reads your code and determines what it does and if the syntax is valid. This is where your code gets translated into something the computer can understand.
- Lexical environment: this exists in languages that take into account *where* in the script your code is. i.e. what came before it, what comes after it etc.
- Execution context: A wrapper to help manage the code that is running. There are lots of *lexical environments*. Which one is currently running is managed via execution contexts. It contains your code as well as things beyond what you have written.

###objects
- objects are just name value pairs
- the name may be defined more than once but it can have only one value in any given context.
- *object* is a collection of name value pairs
- a name is a name but the value could be a collection of other name value pairs (for example)

###lecture 9: the global environment and the global object
- base execution context is the global execution context.
- it creates a 'global object' and a variable 'this'
- Global means 'not inside a function
- variables when not in a function are put inside the global object. `var a = 'hello word';`could be accessed by calling `a`, `this.a` or `window.a`
- This is all run inside the execution context.

###lecture 10: Creation and hoisting (execution context phase one)
- the execution context is set up in two phases:
- the creation phase: this is where js sets up memory space for your functions and variables. *functions* are created in their entirety in the memory. Variables, as the engine won't know what their ultimate definition will be, aren't created in full. Instead you get a 'place holder' in the memory called 'undefined'.

###lecture 11: JavaScript and undefined
- not defined and undefined are not the same thing. the error 'not defined' means that variable doesn't exist. 'undefined' is a value, it just doesn't know what it is yet.
- never do this: `var a = undefined;`. Always let the JS engine set it.

###lecture 12: the execution context: code execution (execution context phase two)
- This is the phase which runs your code after phase one (creating and hoisting) is complete.

###lecture 13: single threaded synchronous execution
- single threaded: executing one command at a time.
- synchronous execution: executed in the order in which it appears

###lecture 14: function invocation and execution stack
- first up a global execution context when you load up your code.
- every time a new function is invoked it creates a new execution context.
*an example of single threaded synchronous execution:*
1. functions and vars are created and hoisted
2. code execution. The code is read line by line.
3. when `a();` is read `function a` will be invoked. This puts the execution context for `function a` at the top of the execution stack (only the function at the top of the stack will be run)
4. `function a` executes `function b` which means that `function b` is now at the top but `function a` hasn't finished yet because `function a`'s purpose is to run `function b`
5. once `function b` is done it is 'popped' off the top of the stack leaving `function a` at the top.
6. function a will now be able to run the rest of its code.
7. once that is done `function a` is 'popped' and the engine can run the last line of code in the global execution context: `var d;`

```
function a() {
  b();
  var c;
}

function b () {
  var d;
}

a();
var d;
```

###lecture 15: variable environments
- talking about where the variables live
- every execution context has it's own variable environment

###lecture 16: the scope chain
- the below will log `1`, not 2 or undefined.
- in the case of `function b` the outer environment is the global scope. myVar was not defined within `function b` so JS looks at the next level up to see if it was defined there.
- this process of looking in the outer environment(s) to see if `myVar` is defined  anywhere is called 'the scope chain'
- here 'myVar' is *lexically* in the global environment
- creating and hoisting only takes place in the global environment. Therefore if `function a` where inside `function b` and `function b` was invoked in the global scope it would not be created until `function a` was called.  
```
function b() {
	console.log(myVar);
}

function a() {
	var myVar = 2;
	b();
}

var myVar = 1;
a();
```

###lecture 17: ES6 and let

NOTHING NEW HERE

###lecture 18: asynchronous callbacks
- asynchronous means more than one at a time.
- JS is synchronous. It handles asynchronous events using the event queue
- as the execution stack is being run if, for example, a click event happens it gets put on the event queue.
- the event queue only gets looked at when the execution context stack is empty
- look at the code B11. Notice that if you click while the function `waitThreeSeconds` the clicks aren't logged until the execution context is done.

###lecture 19: types and JS
- *DynamicTyping* this means that you don't tell JS what kind of data a variable holds. JS works that out for you.
- other languages may use StaticTyping

###lecture 20: primitive types
- there are 6 primitive types is JS. A primitive type is not an object, it is a single value.
1. undefined - represents a lack of existence.
2. null - also represents lack of existence. You shouldn't declare `undefined` when programming. Use `null` instead.
3. Boolean - true or false
4. number - floating point number. This is the only kind of number and it has decimals. You'll need to `parseInt` if you want to use a round whole number
5. String - anything in ""
6. Symbol - this is used in ES6

###lecture 21: operators
- operators: this is kind of function which is written differently to other kind of functions.
- In the following the '+' is the operator. It's syntactic sugar. It just means that you don't have to write `+(3,4)` or something.
- <, >, -, + are all operators
```
var a = 3+4;
console.log(a);
```

###lecture 22: operator  precedence and associativity
- precedence determines which operator gets called first if more than one is called
- associativity: if the precedence is the same then associativity decides which operator gets called first. Just hit [this] (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence) table to find out which one has the higher precedence:
- below the `+` and `*` are both functions.
`var a = 3 + 4 * 5;`

- if the precedence is equal then you need to look at associativity. in the below a, b and c would all equal 4 because the `=` operator has *right to left* associativity.
- operators are functions which return the value of two parameters. Below it works out the value of `b = c` which is 4 and then 'synchronously' moves onto the next function which is now `a = 4`
```
var a = 2, b = 3, c = 4
a = b = c
```
- Grouping is at the very top of the precedence table so you can use `()` to make sure the operators inside the parentheses are run first.

###lecture 23: coercion
- converting a value from one type to another.
- Happens a lot in JS because it is dynamically typed.
- so if you evaluate `1 + '2'` the string 'wins' so it evaluates to `12` as a string rather than `3` as a number . Much like if you logged `'hello' + 'hi'` would look like `hello hi`

###lecture 24: comparison operators
- operators will expect two of the same kind of datatypes. If it doesn't get this then it will coerce one of the datatypes and this will give you unexpected results.
- Also be mindful of using more than one operator at once
- `==` will do coerce so `3 == three` will be `true`
- `===` won't coerce so `3 === three` will be `false`

###lecture 27: existence and booleans
- this is 'truthy' and 'falsey'.
- The coercion JS uses (as it is a dynamically typed language) means that is will convert values, ultimately, to true or false.
- e.g. null, undefined, "" all evaluate to false. But *so does 0*. Therefore false doesn't always mean an absence of existence.
- the following would return nothing as the *if* statement will only run if the condition you give it evaluates to true. `a` is undefined, therefore it is false.
```
var a = 0;
if (a) {
  console.log('something is there');
}
```
- the following *would* run because `0` evaluates to false. So you are essentially saying: if `a` is true (which it isn't, it's `0` which is falsey) *or* if `a` is `0` (which it is) then run. So essentially, 'if true or false then run'.
```
var a = 0;
if (a || a === 0) {
  console.log('something is here')
}
```

###lecture 28: default values
- If you invoke a function to which you have given an argument but you do not pass it an argument when you invoke it e.g.
```
function greet(name) {
  console.log("hello " + name)
};
greet();
```
Instead of not running (like a lot of other languages will do) JS coerces the 'empty space' where it was expecting an argument to `undefined` (which *is* a value) so that it can run the function. As the `+`  operator (also a kind of function) needs two of the same data types in order to work it will convert `undefined`, which is a datatype all of it's own, to a string so that it can run. So the above would log `"hello undefined"`.

- It is often more useful to have a *default value* than it is to have `undefined`. ES6 takes care of this but if you are not using ES6 then you can use the `||` operator to return a value of your choosing. e.g.
```
function greet(name) {
  name = name || "<your name here>";
  console.log("hello " + name);
};
greet();
```
This works because the `||` operator will coerce the first value that can be evaluated as `true`. `Undefined` is false so if `name === undefined`, which it does if you don't parse the `greet` function an argument, then it will move on and return the string `"<your name here>"` as this evaluates to true.
- You still have to be careful with `0` though

###lecture 29: Frameworks/libraries and default values.
- Loading a framework or library in the head of your HTML will just pull in the code from the specified fw/lib and run it in the specified order.
- This could create problems if the libraries look something like these:
`var libraryName = lib1; `
`var libraryName = lib2; `
in this case the variable `library` has been declared in the global object so when you load them in whichever order in your HTML then you will only get access to whichever library was loaded last.
The way Libraries can get around this is by putting something like this at the top of their code:
`window.libraryName = window.libraryName || "lib2";`
So what we are saying here is "if the name of this library has been loaded already then, fine. Do nothing. If it has not been loaded then load it."

###lecture 30: objects and the dot.
- Objects have **properties** or **methods**. In the context of objects **methods** are functions.
- Within an object either primitive datatypes or other objects are considered properties.
- The `[...]` is actually an operator. It is a 'computer membered access operator' and it is very near the top of the operator precedence table.
- the `.` is also a type of operator (called member access operator) so it therefore expects two arguments. It is also even higher on the precedence table than the `[...]` operator. In fact it is second only to the grouping `()` operator.
- This is what the syntax looks like. This would print out "Ben"
```
person = new Object();

person["firstname"] = "Ben";
person["lastname"] = "Green";

console.log(person.firstname);
```
- It is also important to note that the dot operator has *left to right* associativity. So if you did this...
```
person.address = new Object();

person.address.street = "Ashfield Rd"
```
...it would achieve a couple of things.
- firstly `person.address = new Object` will go into the object called `person` and create a key with the `address` which has a value of a new, and so far empty, object.
- Now we can go into this newly created object and put a key called `street` which has a value `Ashfield Rd`.
- In order to log this new key value you can go:
`console.log(person.address.street)`


###lecture 31: Objects and Object Literals

- the best way to create a new object is `var person = {}`. This is the same as writing `var person = new Object`
- The advantage of doing this is that you can create key value pairs in the same line. The following would create the Object called `Ben`, create all of the key value pairs and make them available for the `greet` function to use. It would print out "Hello my name is Ben and I live in London":
```
var Greens = {
  firstname : "Ben",
  lastname : "Green",
  address : {
    street: "Ashfield Rd",
    city: "London"
    }
  };

function greet(person) {
  console.log("Hello my name is " + Greens.firstname + " and I live in " + Greens.address.city);
}

greet(Greens);

  ```
- You can also create new key value pair in an object on the the fly when you call it in a function like so:
```
greet({
  firstname: "Abi",
  lastname: "Green",
  address : {
    city : "Sort of London"
  }
});
```
- The above would change the value of firstname and lastname within the greet function to "Abi" and "Green" respectively. It does not replace these values in the object, however. firstname and lastname in the `Greens` object will retain the values of "Ben" and "Green".

###lecture 32: Faking namespaceses:
- A namespace is a container for variables and functions. They are used to keep variables and functions with the same names separate.
- JS doesn't have the feature 'namespace' but we can fake it. We can do this using objects.
- If you call `greet` in the code below you would only ever get "Hola". If you create variables as objects and then create a key value pair using dot notation you can call them both:  
```
var greet = "Hello"
var greet = "Hola"

var english = {};
var spanish = {};

english.greet = 'hello'
spanish.greet = 'hola'

console.log(english.greet)
```
- `enlish.greet = 'hello'` will create you a key value pair within the english object but `english.greetings.greet = hello` will error because at this point `.greetings` is undefined so once JS coerces `.greetings` making it undefined, it is then trying to do `undifinded.greetings`. Obviously `undifined` is not an object so it errors.  
You would first need to create an empty object: `english.greetings = {}` and then `english.greetings.greet = hello`.
- An easier way to do this is to use *object literal syntax* like so:
```
var english = {
  greetings: {
    greet: Hello
  }
};
console.log(english.greetings.greet)
```
- The overall idea here is that you are keeping variables or functions, the names of which may clash with each other, and giving them their own space to prevent this happening.

###lecture 33: JSON and object literals.
- JSON look a lot like object literal syntax but it is NOT THE SAME.
- Differences: the properties (or keys) have to be wrapped in quotes. This is also valid in JS but the reverse is not valid i.e. all JSON is valid JS but not all object literal notation in JS is valid JSON.
- the method `JSON.stringify(theNameOfYourObject)` will convert your JS object to JSON.
- the method `JSON.parse('{ "key" : "value1", "key" : "value2", }')` will convert a JSON string (all JSON is a string) into a proper JS object.


###lecture 34: functions are objects.
- Think of a function of more than just a container for code. They are OBJECTS.
- First class functions: everything you can do with other types (objects, booleans etc) you can do with a function.
- Functions are objects but they are a special type of object.
- To a function you can attach primitive datatypes, objects or other functions. What makes functions special are the properties 'name', although it doesn't have to have a name, and the code.
- The code in a function is only one property of a function. This is unique because it is invokable.
- You can attach other properties to functions using the dot notation just like you can with any other other kind of object like so:
```
function greet() {
  console.log('hi');
}

greet.language = 'english';
console.log(greet.language);
```
- this console.log would go and find the value of the language property, in this case 'english'.

###lecture 35: function statements and function expressions
- Expression: a unit of code which results in a value. It doesn't have to save into a variable.
```
var a;
a = 3; // the `=` operator will return 3. This is an expression meaning that this line of code resulted in a value. Like so:
```
- Statement: a statement will just do work, it will not return anything. Like so:
```
if (a === 3) {
  b === 3

};
```
function statement:
```
function greet() {
  console.log('hi');
}
```
Nothing will happen until you invoke the function (which is why it is statement). As it is a function it will get hoisted and it will be in memory.

function expression:
```
var anonumousGreet = function() {
  console.log('hi');
}
```
this is an anonymous function set to a variable. You can call it in the same ways which you would run a named function, just invoke the variable: `anonumousGreet();`

- The key difference between function statements and function expressions is that when a statement is read nothing happens until it is invoked. When an expression is read an object is created.

- This is a bit weird: You can pass functions as arguments into other functions. It is made possible thanks to first class functions. It looks like this:
```
function log(a) {
  a();
}

log(function () {
  console.log('hi');
});
```
So here we have `function log` which takes one argument `a`. When we invoke `log` we passing it an anonymous function as an argument. Inside the function `log` the anonymous can then be invoked by taking the argument (in this case `a`) and invoking it: `a();`.

### lecture 36: by value vs by reference
- this refers to variables
- By value (this is how primitives work): if you have `var a = 2` and then have `var b = a` obviously b and a are now the same value. Referencing by value that the value of `a` is copied, a new space is created for this in memory and that is then what `b` references, the *copy* of `a`'s value.
- By reference (this is how all objects (including functions) work): if `a = b` it means that both `a` and `b` are looking at the same place for their shared value.
- the `=` operator creates a new space in memory so if you want to create a new object in memory you have to use `=`
- Mutate: just means to change something.
- Immutable: means that it cannot be changed
- Knowing the difference between by value and by reference can help you de-bug.
- see [here] (/Users/Mac/development/js-weird-parts/D6b-By-Value-By-Reference) for examples.

###lecture 37: Objects, functions and this
- When a function is invoked a new execution  context is created and put on the execution stack.
- With each each execution context a variable environment in created.
- Each function has access to it's outer environment. it is able to look down the scope chain to see if variables called within it's own lexical environment
exist within any of the outer environments (that is if it cannot see a variable assignment within its own environment)
- The `this` keyword does not attach to the function in which you are calling it.
- `this` actually refers to the environment in which the function was called. So if you just go...
```
function thisFunction () {
  console.log(this):
}
thisFunction();
```
...`this` will be the window object/global object.
if you were to do...
```
var ExampleObject = {
  name: "this is a name",
  function: function () {
    console.log( this);
  }
};
ExampleObject.function();
```
...`this` would be `ExampleObject`
- However, if you are more than one function deep inside an object, `this` will go back to pointing at the global object. So if you had an object like so:
```
var AnObject = {
  key1 : 'value1',
  log : function () {
    console.log(this) //at this point 'this' is 'AnObject'
    var thisGetsWeird = function() {
      console.log(this); //this goes back to refering to the global object. Why? no one knows.
    }
    thisGetsWeird();
  }
}
AnObject.log();
```
...the second time `this` is called inside `thisGetsWeird` it goes back to pointing at the window.
You can work around this quirk by declaring a variable at the top of your first function and using that variable within the object instead of using 'this'. Like so:
```
var AnObject = {
  key1 : 'value1',
  log : function () {
    var self = this;
    console.log(self) //'self' or 'this' makes no difference here
    var thisGetsWeird = function() {
      console.log(this); //this is where you must use 'self' instead of 'this' in order to refer to the containing object (i.e. AnObject). Otherwise 'this will go back to' referring to window.
    }
    thisGetsWeird();
  }
}
AnObject.log();
```
- All of this is possible because objects are stored in memory by reference not by value. This means that you can mutate (change) the value of a variable and it will be changed within that whole object, whatever uses it, until you want to change it again, then it will be changed, again, for anything that will be able to see that variable.
- This is where the `let` key word will start to resolve some of these problems. *You should look into this.*

###lecture 38: arrays: collections of anything
- this is the array literal syntax: `var arr = [];`
it will create you a new array. You can also put things in your array at the same time like so: `var arr = [1, 2, "hello", false]`.
- get funky with it:
```
var arr = [
  1,
  false,
  {
    name: 'Ben',
    city: 'London'
  },
  function(name) {
    var greeting = 'Hi'
    console.log(greeting + " " + name)
  },
  'what, all of that in one array?'
]
console.log(arr);
```
- Access the city in the object which is the third item in the array (but arrays are zero indexed) so you go `arr[2].city`
- Invoke the function which is the fourth item in the array like so: `arr[3]("Ben")`. This would print out "Hi Ben".
- Pass the name property from the object which is the 3rd item in the array to the function which is the fourth item in the array: `arr[3](arr[2].name);`
- This is all made possible through JS's *Dynamic Typing*.

###lecture 39: arguments and spread
- arguments is a key word.
- When you execute a function a new Execution context is set up for us. It sets up the Variable Environment, Outer Environment, 'this' and '*Arguments*'
- Arguments is just another word for parameters, i.e. what you pass into your function. However it is also a keyword.
- We know that JS doesn't care if you put 10 parameters into your function and pass it 0 or 4 or 7 of these when you invoke the function. it will just give you 'undefined' if you don't pass it anything.
- The key word `argument` gives you an array (it's not actually an array but is very similar) of the arguments you have passed when invoking the function.

```
function greet( firstName, lastName, language) {
  if (arguments.length === 0) {
    console.log("Missing paramiters!");
    return;
  }

  language  = arguments[2] || 'English';
  console.log("First name: " + arguments[0]);
  console.log("Last Name: " + arguments[1]);
  console.log("Language: " + language);

}

greet("Ben", "Green");

```
so this will log out:
```
First name: Ben
Last Name: Green
Language: English
```
- ES6 will let you do this:
`function greet (firstName, lastName, language ...other)`
- The `...other` means that if you pass more arguments than the ones you have told the function to expect, it will wrap them all up in an array, in this case, called other (but you could call that whatever you like).

###lecture 40: function overloading
- If other languages you can have functions of the same name which have different numbers of perameters.
- Because JS supports *first class functions* you can get around the absence of 'function overloading'
(a first class function means that you can pass functions to other functions)

###lecture 41: Syntax parsers
- The syntax parser is the intemediate program which reads your code and decides if it is valid.
- The syntax parser will go through your code character by character, may even make some changes, and if all is well it'll run. If not then it will throw an error.
- It is not a difficult concept but it is important to make sure you are aware that this is happening.

###lecture 42: DANGER! Automatic Semicolon
- Semicolons in JS are optional. This is because the syntax parser in JS will put semicolons where it thinks they should be.
- Most of the time it gets it right but it can be very tedious when it gets it wrong.
- So the moral here is *always* put your own semicolons in.
- The other thing you should make sure of is that you put your opening curly braces on the same line as your functions. Do *don't* do this:
```
function greeting ()
  {
    return
        {
        firstName: 'Ben'
        }
      }
```
This will return `undefined` as the syntax engine will put a semicolon after the `return`. Instead do this:
```
function greeting () {
  return {
      firstName: 'Ben'
  }
};
```

###lecture 43: Whitespace
- Whitespace: invisible charaters (returns, tabs etc).
- The JS syntax parser doesn't really care about whitespace
- take advantage of this to make your code readable

###lecture 44: immediately invoked function expressions or (IIFE)
- A normal function is a statement. It is put into memory during the first phase of the Execution Context (creating and hoisting. See lecture 10)
- A function expression is when you use a var to declare the function like so:
```
var greeting = function (name) {
  console.log('hello' + name );
};
```
- As we know, variables are put into memory during 'creating and hoisting' but are set to `undefined` until they are actually executed.
- with both statements and expressions you will have to invoke them before they run the code.
- You can create an IIFE. It is a function expression which is 'self invoking' or 'immediately invoked'
Like so:
```
var greeting = function (name) {
  return ('Hello ' + name);
}('Ben');
console.log(greeting)
```
- It is important to note here that the  `var greeting` becomes a string once it has been invoked. `var greeting` now equals `'Hello Ben'`
- So you can just put `3;` or `"I am a string"` or whatever into your code. It just sits in memory and doesn't do anything but you cannot do this:
```
function () {
  console.log('this will error');
};
```
- The above is not valid code, it will error. You could write a named function statement or you could write a function expression (i.e. a anonymous function which is assigned to a variable). If you do either of these things then the syntax parser sees that you have given your function a name and knows that you can therefore invoke it somewhere else in your code. It *doesn't* like the above example because it does not think you can use it.
- The way you can get around this is by wrapping your function in `()`. Remember that `()` are operators just like `+` or `*` and they are right at the top of the operator precedence table as well, just a reminder.
- So if you write a function like so...  
```
(function () {
  console.log('this won't error')
  }();)
```
...then you can get away with it. The above is an immediately invoked function expression but you haven't had to use a variable like you did with your previous example.
- A more complex example:
```
var name = "Ben";

(function (name) {
  var  greeting = "Hello"
  return (greeting + name);
}(name)); //you can invoke inside the parentheses or outside.
```
...would return "Hello Ben"
- You will see IIFE's in lots of frameworks.


###lecture 45: IIFE's and safe code
- You will often see, when you open up a framework, that the entire code is wrapped in parentheses and that the whole thing is one big IIFE.
- This is because a) you want the whole framework to be run when you start your application and b) you want that framework to have it's own execution context so that it doesn't collide with any other code you may have in the global object.
- If you want to access the global object within a function's execution context you can just pass an argument which will allow you to do this.
```
(function (name, global) {
  var greeting = 'hello'
  global.greeting = 'hello'
  console.log(greeting + " " + name);
  }(window, 'Ben'))
```
- In your browser the global object will be window so here we are passing the function the global object which now means that `greeting` in both the execution context of the global object *and* within the function (which, of course is also an object) will be `'hello'`.

###lecture 46: Understanding closures part 1
This will log 'Hi Ben' :
```
function greet(whatToSay) {
  return function(name) {
    console.log(whatToSay + " " + name);
  };
}
greet('Hi')('Ben');
```

This will also log 'Hi Ben' :
```
function greet(whatToSay) {
  return function(name) {
    console.log(whatToSay + " " + name);
  };
}
var sayHi = greet('Hello');
sayHi('Ben');
```
- This is possible because of closures. Closures are a feature of JS. You don't have to tell the JS engine to create closures it will do this automatically. You don't *create* a closure you take advantage of it.
This is what happens:
- Execution context: phase one. The functions and vars are hoisted and put into memory.
- Execution context: phase two. The code is read line by line. When the engine gets to `var sayHi = greet(hello)` it invokes the function `greet` and creates a new execution context for that function.
- The code inside `greet` returns a new function (which is in this case anonymous) and once it has done that the `greet` function is finished. It is 'popped' off the execution stack.
- **crucially** though the variable it created (in this case `'hi'`) is **still available**. So when the `sayHi` execution context is created it has access whatever we passed `greet` i.e. `'hi'`.
-  The code inside this anonymous function which `greeting` returned is going to look for a variable `whatToSay` because it needs to run `console.log(whatToSay + name)`. We've passed it `name` when we called it and when it looks down the scope chain it will see the that the `whatToSay` var which we passed to `greet` is available. So it will run, no problem.

###lecture 47:  Understanding closures part 2
- This is a good example to how closures work...
```
function buildFunctions() {

  var arr = [];

  for (var i = 0; i < 3; i++) {

    arr.push(
      function() {
          console.log(i);
      }
    );
  }
  return arr;
}

var fs = buildFunctions();

fs[0]();
fs[1]();
fs[2]();
```
- What it prints out is
```
3
3
3
```
- `3` is the last number to be created in the for loop. It is the number which stops the loop because it is not `< 3`. Therefore when the `buildFunction` execution is popped off the stack `i = 3`.
- By the time it is done `buildFunction` has pushed three anonymous functions into the array called `arr` and left the array (along with its contents) and `i = 3;` in memory (even though `buildFunction` itself is not longer on the execution stack).
- So `var fs` now equals what `buildFunction` has left behind.
- `fs[0]();` invokes the first function in the array `arr` and because when `buildFunction` was popped `i = 3` all three of the functions in the array are going to print out `3`

**if you wanted to print out the what `i` was equal to when the function was pushed to the array:**

- in ES6 you could just do it with `let`:
```
function buildFunctions() {

  var arr = [];

  for (var i = 0; i < 3; i++) {
    let i = j
    arr.push(
      function() {
          console.log(j);
      }
    );
  }
  return arr;
}
```
- But it is a good idea to understand the difference between `var` and `let` so here is how you would do it without `let`:
```
function buildFunctions2() {

  var arr = [];

  for (var i = 0; i < 3; i++) {

    arr.push(
     (function(j) {
       return function() {
          console.log(j);
      };
    }(i))
    );
  }
  return arr;
}

var fs2 = buildFunctions2();

fs2[0]();
fs2[1]();
fs2[2]();
```
- In the above example we are using an IIFE ensure that when the functions in the array are invoked they are able to see what `i` was when they were pushed.
- The IIFE invokes as soon as it is pushed into the array. The IIFE itself is popped but returns the function which we will later invoke leaves a new variable called `j` in memory which is the value of `i` when the function was pushed into the array. You then print `j`.

### lecture 48: function factories
- A factory is just a function which returns/makes other things for you.
- Every time a function is called, even if it is the same function being called multiple times, it creates it's own execution context. Even though the function itself will be popped off the stack when it is finished you can store the resulting code (maybe it will return a function and/or what you passed it for an argument) in a variable.
```
function makeGreeting(language) {

  return function (firstName, lastName) {
    if (language === 'en') {
      console.log('Hello ' + firstName + ' ' + lastName);
    }
    if (language === 'es') {
      console.log('Hola ' + firstName + ' ' + lastName);
    }
  };
}
```
- the following are two different variables calling the same function but creating two different execution contexts:
```
var greetEnglish = makeGreeting('en');
greetSpanish('Ben', 'el Greeno');
```
- We can now treat these variables like functions and give it the variables which the function returned by `makeGreeting` wants:
```
greetEnglish('Ben', 'Green');
greetSpanish('Ben', 'el Greeno');
```
- You can create functions which are easier to use by creating functions which create other functions and which have some parameters by default. You can do this because, in JS, functions are objects.

###lecture 49: closures and callbacks.
- the following is an example of using closures and first class functions...
```
function sayHiLater() {
  var greeting = "hi";

  setTimeout(function() {
    console.log(greeting);

  }, 3000);
}

sayHiLater();
```
...`setTimeout` is a function which requires access to the variable `greeting`. This is still available when it looks down the scope chain even though the function `sayHiLater` has been popped.
jQuery often uses first class functions, function expressions and callback. Here a function is invoked when `button` is clicked. When it is clicked you are passing it function:  
```
$('button').click(function() {
    console.log('clicked');
  })
```

**callbacks**
- a function you give to another function to execute after the first function is done. e.g:
```
function tellMeWhenDone(callback) {

  var a = 1000; //Some work. Could be anything
  var b = 2000;

  callback();
}

tellMeWhenDone(function() {
  console.log('I am done');

});

tellMeWhenDone(function() {
  console.log("I am also done");
 });
```

###lecture 50: call(), apply() and bind().
- Remember a function is a special type of object and has access to, as all objects do, methods. call(), apply() and bind() are three methods built into JS that all functions have access to.
- `.bind` creates a copy of whatever function you are calling it on.

Here, when `var logPersonName = logName.bind(person);` is called `.bind` has created a copy of the `logName` function expression along with a  new execution context so when `logPersonName()` is run it is invoking a copy of `logName` and as, when  we created this copy with `.bind`, we passed it the object `person`, `this` is now `person`.  
```
var person = {
  firstName: 'Ben',
  lastName: 'Green',
  getFullName: function(){
    var fullName = this.firstName + " " + this.lastName;
    return fullName;
  }
};

var logName = function(lang1, lang2) {
  console.log('Logged: ' + this.getFullName());
};

var logPersonName = logName.bind(person);

logPersonName();
```
Or a different way would be to create the `logName` function expression with the `.bind` method already attached. Like so:
```
var logName = function (lang1, lang2) {
  console.log('hello');
}.bind(person)//using 'bind' here is where you are telling the syntax parser that this is where you want 'this' to be.
```
- so `.bind`: creates a copy of a function and dictates where the 'this' variable is.

- Next up: `.call`. It invokes a function in the same way that `functionName(argument);` would but if you use `functionName.call(greeting)` it will let you determined what 'this' is. In this case 'this' you are invoking a function called `functionName` and are making a function `greeting` 'this'. You can pass in other arguments at the same time like so ('person' is an object used in the previous example so 'this' is now 'person'):
```
var logName = function(lang1, lang2) {
  console.log("Arguments " + lang1 + " " + lang2);
}

logName.call(person, "en", "es");
```
- Next: `.apply`. This is almost the same as `.call` but you have to put any arguments you pass in an array. e.g:
```
logName.apply(person, ["en", "es"]);
```
- when you are using either `.call` or `.apply` you could use them in a IIFE like this:
```
(function(lan1, lan2) {
  console.log("lan1: " + lan1 "lan2: " + lan2)
  }.apply(person, ['en' 'es']));
```
- so here we have an IIFE being immediately invoked with `.apply` thus giving us the ability to assign 'this'. Here we have assigned 'this' to our person object again.

- **function borrowing**
here we have used the person.getFullName method which we wrote out in our person object and we are 'borrowing' the function an using it to get the full name from the person2 object.
console.log (person.getFullName.apply(person2));

```
var person2 = {
  firstName: "Jane",
  lastName: "Doe"
};
console.log (person.getFullName.apply(person2));
```

- **function currying**
Creating a copy of a function but with some preset parameters.
```
function multiplyByTwo(a, b) {
  return a * b;
}

var multiplyByTwo = multiplyByTwo.bind(this, 2);
multiplyByTwo(4);

console.log(multiplyByTwo(4));
```
- here we have set up a multiplyByTwo function which accepts two arguments. As `.bind` creates a copy of the function and as have passed it an argument `2` as well making the copy of the argument 'this' we can call the copy using the invoking the var multiplyByTwo and passing it one argument, the second argument will now always be 2.


###lecture 51: functional programming
- JS is a functional programming language meaning that it has first-class functions.
- function programming: try not to mutate data when you are passing functions around.
- Have a look at D20 for examples of functional programming.
Here the mapForEach function is accepting two arguments, an array and a function.
```
function mapForEach (arr, fn) {

  var newArr = [];

  for (var i = 0; i < arr1.length; i++) {

    newArr.push(
      fn(arr[i])
    );
  }
  return newArr;
}

var arr1 = [1,2,3];

console.log(arr1);
```
We are passing the function `var checkLimit` to `mapForEach` with the argument `2` in `var arr5`. We are then invoking `checkLimit` within the loop in `mapForEach` and passing it `arr[i]` ...
```
var checkLimit = function(limiter) {
  return function(limiter, item) {
    return item > limiter;
  }.bind(this, limiter);
};

var arr5 = mapForEach(arr1, checkLimit(2));
console.log("arr5: " + arr5);
```
...because calling the checkLimit with `.bind` creates a *copy* of the function, when checkLimit returns *it's* function, which requires two arguments, it has those two arguments. The first of which is what we passed it with the value in `var 5` the second of which is what we passed it in the loop in `mapForEach`.
*to future Ben: at the time of writing you didn't really get this. There may be some errors in this explanation*


###lecture 52: functional programming part 2
- Underscore.js is a great JS library which helps you work with objects and arrays. It also offers explanations on what the code actually does.
- You can download the production or the development code *or* the 'annotated source' which gives detailed notes on what the code does.
- lodash.com is a 'new and improved' version of underscore.js. Also good but doesn't have the notes.
- There is an object within the global scope of the underscore.js library which is simply called `_`. This means that all of the methods within this object are accessible using dot notation.

###lecture 53: Classical vs prototypal inheritance
- Object oriented JS and prototypal inheritance.
- inheritance: one object gets access to the properties and methods of another.
- Classical inheritance: this is the most popular way that inheritance works in programming languages. The problem with it is that it is very verbose. You can get yourself into a real mess if you have a lot of code.
- Prototypal inheritance lessens the complexity, it can make you programming more efficient so you do more with less code.

###lecture 54: understanding the prototype
- If we have an object in memory, this object has properties. These may be properties which we have created but all objects have access to properties which JS creates automatically. One of these properties is the *prototype property*.
- It is important at this point to understand the *prototype chain*
if we have an object like this:
```
var person = {
  firstName: "Default",
  lastName: "Default",
  getFullName: function () {
    return this.firstName + ' ' +this.lastName;
  }
};
```
and we have another object like this:
```
var ben = {
  firstName: "Ben",
  lastName: "Green"
};
```
and we do this (although you should never use the `__proto__`):
```
ben.__proto__ = person;

console.log(ben.getFullName());
console.log(ben.firstName);
```
the first console.log will print out "Ben Green". This is because `ben` has *prototypically inherited* the properties of `person`. The prototype chain means that if we try to return a property of ben, JS will first look in `ben` to see if it can find that property. If it cannot then it will look down the chain and in this case the next step down the chain is `person`. So in the case of the first console.log we go: 'OK you want to invoke a function `getFullName`. Is it in `ben`? No, OK next step down the chain is `person` is it in `person`? Yes. Ok what information do we need to execute this function? `this.firstName` and `this.lastName`. OK are they in `ben`. Yes.' So we get "Ben Green".
if we were to add another object to this lot with only a `firstName` property and also hook it up to the person prototype like so...
```
jane = {
  firstName: Jane;
}

jane.__proto__ = person
```
and then call the `getFullName` method...
```
console.log(jane.getFullName);
```
what we would get is `"Jane Default"`. First of all remember that `this` points to *the object which called the function* which in this case is `jane`. So this.firstName is "Jane". Then it looks for `this.lastName`, doesn't find it in `jane` and so looks for it down the prototype chain. Now the next step in the prototype chain is *not* `ben`. The next step down the prototype chain for both `ben` and `jane` is `person` so we get "Jane Default" printed out.

###lecture 54: everything is an object or a primitive
- everything is JS that isn't a primitive is an object. All objects have a prototype with one exception: a base object does not have a prototype.
```
  var a = {};
  var b = function () {};
  var c = [];
```
The reason that all of the above have access to various methods (the methods available are obviously different depending of whether you are using an object, function or an array) is thanks to the prototype chain. If you were to go into your browser console and type
`c.__proto__.` the console will show you all of the methods which are available for, in this case, an array. These methods are available because JS automatically creates a prototype with them built in. if you were to call `c.push(3);` then the engine looks in `c`, sees that there is no method `push`, looks down the prototype chain and in this case the next step down the chain is the prototype which JS built. This is an object which contains the methods you can use on any particular kind of object. Therefore it looks in the prototype for arrays and here there is this method so you are able to use the `.push`.

The base object does not have a prototype because it is the end of the line. So `c.__proto__.`is the object with all of the array's methods in. `c.__proto__.__proto__` i.e. what is the prototype of the array's prototype? It's a base object: `object {};`

###lecture 56: reflection and extend
- reflection: and object can look at itself, listing and changing its properties and methods.
- In ES6 there is a keyword `extends` which extends the prototype. It does something similar to `_.extend` in the underscore.js lib.
**you need to work harder to understand this stuff. Code for this section is available in the E4 folder but you need to go over it again**

###lecture 57: function constructors, 'new' and the history of JS

- one way to build an object is using object literal syntax `myObject = {}`. Another way is to use the `new` keyword: `var john = new person();`
- JS doesn't *really* have classes. The `new` keyword is a way they try and fake it.
- `new` is actually an operator. When we use `new` it creates an new empty object. It also reassigns the `this` variable to the object it has just created.
- function constructors: a normal function which is used to create variables. Really it is the `new` keyword which makes the object and the function is used for adding properties and methods.

###lecture 58: function constructors and '.prototype'
- when you use a function constructor it sets the prototype for you.
- again, functions are objects. All functions have prototypes but unless you use a function as a function constructor (ie when you use the `new` operator) then the prototype doesn't do anything.
- the `.prototype` is not the prototype of the constructor function which you use to create your objects, it is the prototype of the objects which that constructor function creates.
- all prototypes start their life as an empty object. It exists so that you can add onto it.
- as a rule you will add properties to different objects. You need to do this as properties will obviously need to be different. However you should only add methods to the prototype. This is because you will use the same methods repeatedly, you don't want to be making a new method every time you create a new object.
for example:
this is our constructor function:
```
function Person(firstname, lastname) {
  console.log(this);
  this.firstname = firstname;
  this.lastname = lastname;
  console.log('this function has been invoked');
}
```
now we are going to add this method to the prototype  of the person object which our constructor function has created:
```
Person.prototype.getFullName = function() {
  return this.firstname + " " + this.lastname;
}
```
now we are going to create some objects with the constructor function and give those objects some values (but no methods):
```
var john = new Person("John", "Doe");
console.log(john);

var jane = new Person("Jane", "Bow");
console.log(jane);
```
Now we will put a method onto the *prototype* of the person function. This means that the Person objects we just created will have access to these methods but we have just created this method once instead of creating it each time we make a new object.
```
Person.prototype.getFormalFullName = function() {
  return this.lastname + " " + this.firstname;
}
```
now if we log the function which we added to the prototype we'll get, is this case, the first and last name of both john and jane:
```
console.log(john.getFormalFullName);
console.log(jane.getFormalFullName);
```

###lecture 59: **danger** 'new' and functions
using function constructors are just functions but using the `new` keyword changes some things:
- it creates a new empty object
- when the execution context runs it points the `this` variable at that new empty object
- if you don't return anything explicitly it returns that new object for you
if you forget to put on the `new` keyword then the function will still execute but all of the values and methods you may have assigned will just be `undefined` so as/when you try to access these values/methods it will error.
Follow the convention of naming the function constructor with a capital letter to make it easy to identify constructor functions and help you trouble shoot if you forget to put `new` in.
**there are new ways of creating objects in ES6. You should look into this**

###lecture 60: built in function constructors
- There are some functions and function prototypes which exist. e.g. `var a = new Number(3)`. This would create a new object called number and put a primitive value `3` inside of that object. As `Number` is an object it has a prototype and therefore has access to the functions within that prototype: `Number.prototype.toString` for example.
- built in function constructors such as `var a = new Number(3)` and `var b = new String("john")` may seem as though they are creating primitive datatypes but they are creating objects with the specified primitive value inside of them.
- Sometimes the JS engine will create an object for you just so you can have access to methods which are only available on objects. e.g. `"john".length` would return 4 but only because JS 'boxes it into an object' so it can get the information you are asking for.
- In fact if you put `String.prototype` into the console it will show you the String prototype along with all of the different methods which will be available to any string. Same for number, obviously, and Date (slightly less obviously).
- You can also
```
String.prototype.isLengthGreaterThan = function(limit) {
  return this.length > limit;
};
console.log("John".isLengthGreaterThan(3));
```
The above would evaluate to true.
In order to do this with a number you would have to create the object yourself. JS will convert strings into objects for you but not numbers for some reason.
So you do this: `var a = new Number(3)` then follow the above example subbing `a` for your number and `Number` for `String` .

###lecture 61: **danger** built in function constructors
- You want to be careful using built in constructor functions. Use *actual* primitive values or object literal syntax. This makes what you are doing explicit. The problem with using built in constructor functions is that it becomes easy to confuse objects for primitives and operators, for example, can behave unexpectedly as a result.
- there is a great library called MomentJS which you could use instead of built in constructor functions.

###lecture 62: **danger** arrays and for..in
- an array is an object and each item becomes a name value pair.
- DO NOT USE `for in` loops to iterate over arrays. This is because if you are using a library which may add some methods/values to the array prototype, you can unintentionally iterate down into the prototype and get some unexpected results.
This is what the syntax you should avoid looks like:
```
var arr = ["John", "Jane", "Jim"];
for (var prop in arr) {
  console.log(prop + ": " + arr[prop])
}
```

###lecture 63: object.create and pure prototypal inheritance
- Function constructors were designed to mimic classes which are found in other languages. It may be better to focus on the fact that JS prototypal inheritance rather than classical inheritance.
- This would be how you create objects from a prototypical point of view:
```
var person = {
  firstname:"Default",
  lastname: "Default",
  greet: function() {
    return "Hi " + this.firstname;
  }
}

var john = Object.create(person);
john.firstname = "John";
john.lastname = "Doe";
console.log(john);
```
...so this is pretty simple. You create an object with object literal syntax, put in the parameters which you want and then you simply override these perameters as required.
- NOTE: you need to remember to include `this` on your methods, in this case the greet function. Objects do not create execution contexts therefore in order for you to be able to use this method, which you could do like so: `john.greet();`, you need to make sure that `this` is the object you created and not the window object else the `greet` method won't know what `firstname` is. It will error: 'firstname is not defined'.

- This way of creating objects is supported in newer browsers but not in all older browsers. In order to ensure maximum compatibility you will need to include something called `polyfill`.
- you can just use `if(!Object.create){...}` and then put in a bunch of code which will mean your application will run in older browsers.
- I am not going to go into specifics here as if you are relying on object.create then you will probably be relying on other ES5 features as well. Anything pre IE9 (circa 2011) will be a problem so if you need to support these ancient browsers then it's best to just use either a transpiler or an ES5-shim which addresses all of the ES4/ES5 compatibility problems.

###lecture 64: ES6 and classes.
```
class Person {
  constructor(firstname, last) {
    this.firstname = firstname
    this.lastname = lastname
  }
  greet() {
    return "Hi " + firstname;
  }
}
var john = new Person("John", "Doe");
```
to set the prototype you need to use the keyword `extends` like so:
```
class InformalPerson extends Person {
  constructor(firstname, lastname) {
    super(firstname, lastname);
  }
  greet(){
    return "Yo " + firstname;
  }
}
```

#Odds and ends

###lecture 65: initialization
- basically just this...
```
var people = [
  {
    firstname: "John",
    lastname: "Doe",
    address: [
      "111 Main St",
      "222 Third St"
    ]
  },
  {
    firstname: "Jane",
    lastname: "Doe",
    addresses: [
      "333 Main St",
      "444 Fifth St"
    ],
    greet: function() {
      return "Hello";
    }
  }
];
```

###lecture 66: typeof, instance of and figuring out what something is.
- arrays are objects so if you do `arr = [] console.log(arr)` it will give you `object` as a string.

###lecture 67: strict mode
- just type "use strict;" at the top of your code
- you can use strict globally or you can use it within an object or a function.
- if you have several JS files in production, you minify and concatinate them into one JS file and you have "use strict" at the top of the first then *all* of the code will "use strict". Something to watch out for.

#jQuery

###lecture 70: dive into jQuery part 1
- you can use either the word jQuery or simply `$` to reference the jQuery library
- jQuery gives you a whole load of methods on the prototypes of functions and objects over and above what standard JS gives you.
- the first 38 lines of the library is wrapped in an IFFE which accepts two arguments: global and factory.  
- The arguments given on line 38 are

1 i.e. passed as the 'global' argument: a ternary operator (accepts three parameters):
```
 typeof window !== "undefined" ? window : this, function(window, noGlobal)
```
This is saying 'if window isn't equal to undefined pass window as the global argument. Otherwise pass whatever the `this` variable is pointing to.

2. i.e. the 'factory' argument:
```
function(window, noGlobal) {...
```
as we know, factories are functions which build code for us to reuse. It is this factory function in which the jQuery code sits.
It sets up a bunch of variables for us including defining the term jQuery (on line 70).
var jQuery is just a function, not a constructor function but it does return a constructor function.
This is useful as it means you, the user, do not have to keep using the `new` keyword when using jQuery.

on line 89 we see `jQuery.fn = jQuery.prototype` which is what the function in `var jQuery` was referencing.
It then gives us a bunch on name value pairs i.e. putting a bunch of functionality onto the jQuery object's prototype.

A lot of what is happening here is using `for...in` loops to add properties from one object to another object...

###lecture 71: dive into jQuery part 2
- you can simply borrow (copy and paste) code from jQuery.
- Sizzlejs.com is another library which sits inside of jQuery. In this case the Sizzle lib is sitting inside and IIFE which is sitting inside the IFFE which invokes the whole jQuery library...

###lecture 72: dive into jQuery 3
- there is an .addClass method in jQ as well as a .removeClass method. They both take an argument in which you specify the class you wish to add and remove.
- method chaining: this allows you to call one method after another with dot notation. It is made possible with methods like the add/removeClass in jQ because each method returns `this` after it is called. Therefore when chaining methods you are affecting what is returned from the previous method after the previous method has run its code.

#Building our own framework/library.
- It'll be called Greeter, it'll help us give greetings.
- when given a first name and a last name it will give the user both a formal and informal greeting and support both english and spanish.
- it should be reusable
- it should support jQuery
- it should be referenced using shorthand variables such as `G$()`
