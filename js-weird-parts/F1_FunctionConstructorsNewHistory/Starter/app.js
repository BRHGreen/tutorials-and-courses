// function Person(firstname, lastname) {
//   console.log(this);
//   this.firstname = firstname;
//   this.lastname = lastname;
// }


//prototype chain: the `new` keyword creates an empty object. The `.prototype` method (available on all functions but only actually used on constructor functions) is the prototype for all of the objects created using whichever constructor function you're refering to, in this case `Person`. So here we are adding a method `getFullName` to the Person obj. This means that when the objects created by var john and var jane look down the prototype chain they have access to this method so you can call it...

// Person.prototype.getFullName = function() {
//   return this.firstname + " " + this.lastname;
// };

// var john = new Person("John", "Doe");
//...(you obviously have to call it below where you have defined the var or it will try and call the method on `undefined` and error) like so:
// console.log(john.getFullName());


// var jane = new Person("Jane", "Bow");
// -------------------








function Person(firstname, lastname, gender) {
  this.gender = gender;
  this.firstname = firstname;
  this.lastname = lastname;
}

var john = new Person ('John', 'Doe', 'm');


var jane = new Person('Jane', 'Doe', 'f');


Person.prototype.getFullName = function() {
  return this.firstname + " " + this.lastname;
};

Person.prototype.getFormalFullName = function() {
  if (this.gender === 'f') {
    return "Ms " + this.firstname + " " + this.lastname;
  } else {
    return "Mr " + this.firstname + " " + this.lastname;
  }
};

console.log(jane.getFormalFullName());
console.log(john.getFormalFullName());
