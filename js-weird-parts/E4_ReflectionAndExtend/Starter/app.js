var person = {
    firstname: 'Default',
    lastname: 'Default',
    getFullName: function() {
        return this.firstname + ' ' + this.lastname;
    }
};

var john = {
    firstname: 'John',
    lastname: 'Doe'
};

// don't do this EVER! for demo purposes only!!!
john.__proto__ = person;

for (var prop in john) {
  if (john.hasOwnProperty(prop)) {
  console.log(prop + ": " + john[prop]);
  }
}

var jane = {
  address: "111, main st",
  getFormalFullName: function() {
    return this.lastname + " " + this.firstname;
  }
};

var jim = {
  getFirstName: function () {
    return firstname;
  }
};

_.extend(john, jane, jim); //this will take all of the properties from the john, jane and jim objects and puts them on the John object. Check the underscore.js sourcecode to see how it works.
console.log(john);
