var person = new Object();

person["firstname"] = "Ben";
person["lastname"] = "Green";

var firstNameProperty = "firstname"

console.log(person);
console.log(person[firstNameProperty]);

console.log(person.firstname);

person.address = new Object();
person.address.street = "Ashfield Rd"

console.log(person.address.street);
