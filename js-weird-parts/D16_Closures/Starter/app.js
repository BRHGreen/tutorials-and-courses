function greet(whatToSay) {
  return function(name) {
    console.log(whatToSay + " " + name);
  };
}

// greet('Hi')('Ben');
 //here you are invoking a function which returns a function which you can then, in turn, invoke.

var sayHi = greet('Hello'); //here you are invoking the function just like you are on line 7 but this time you have assigned the invokation to a variable. So now when you call the variable 'sayHi' it will take an argument and pass it to the function inside the 'greet' function. 
sayHi('Ben');
