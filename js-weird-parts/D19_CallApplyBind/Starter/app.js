var person = {
  firstName: 'Ben',
  lastName: 'Green',
  getFullName: function(){
    var fullname = this.firstName + " " + this.lastName;
    return fullname;
  }
};

var logName = function(lang1, lang2) {
  console.log('Logged: ' + this.getFullName());
  console.log(this);
};
//.bind
// var logPersonName = logName.bind(person);
//here we are treating the function logName as an object (Which it is. All functions are objects). and just calling a method of that object: .bind
//And now we invoke the function
// logPersonName();


//.call
var logName = function(lang1, lang2) {
  console.log("Arguments " + lang1 + " " + lang2);
  console.log(this);
};

logName("en", "es");
//---------------------------


//function borrowing

var person2 = {
  firstName: "Jane",
  lastName: "Doe"
};
//here we have used the person.getFullName method which we wrote out in our person object and we are 'borrowing' the function an using it to get the full name from the person2 object.
console.log (person.getFullName.apply(person2));

//function currying

function multiplyByTwo(a, b) {
  return a*b;
}

var multiplyByTwo = multiplyByTwo.bind(this, 2);
// multiplyByTwo(10);

console.log(multiplyByTwo(10));

//here we have set up a multiplyByTwo function which accepts two arguments. As `.bind` creates a copy of the function and as have passed it an argument `2` as well making the copy of the argument 'this' we can call the copy using the invoking the var multiplyByTwo and passing it one argument, the second argument will now always be 2.
