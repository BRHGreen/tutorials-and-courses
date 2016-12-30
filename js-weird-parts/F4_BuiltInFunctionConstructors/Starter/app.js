//String.prototype points at the string prototype i.e. object which stores all of the methods which are available to all strings everywhere. Just like any other kind of object we can create new methods inside this object.

//here we have created a new method called 'isLengthGreaterThan', it accepts one argment and runs a bit of code. Now this is on the string prototype and is available to all strings everywhere.

String.prototype.isLengthGreaterThan = function(limit) {
  return this.length > limit;
};


//Here we are calling our new method on a string.
console.log("John".isLengthGreaterThan(3));

Number.prototype.isLessThan = function(limit) {
  return this < limit;
};

var a = newNumber(3);

console.log(a.isLessThan(10));

var 
