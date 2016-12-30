var person = {
  firstName: "Default",
  lastName: "Default",
  getFullName: function () {
    return this.firstName + ' ' +this.lastName;
  }
};

var ben = {
  firstName: "Ben",
  lastName: "Green"
};

//don't use __proto__ ever. For demo only


ben.__proto__ = person;

console.log(ben.getFullName());
console.log(ben.firstName);


var jane = {
  firstName: "Jane"
};

jane.__proto__ = person;

console.log(jane.getFullName());
