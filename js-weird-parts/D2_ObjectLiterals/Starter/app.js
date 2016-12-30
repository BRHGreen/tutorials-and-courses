var Greens = {
  firstname : "Ben",
  lastname : "Green",
  address : {
    street: "Ashfield Rd",
    city: "London"
    }
  };

function greet(person) {
  console.log("Hello my name is " + person.firstname + " " + person.lastname + " and I live in " +  person.address.city);
}

greet({
  firstname: "Abi",
  lastname: "Green",
  address : {
    city : "Sort of London"
  }
});

console.log(Greens);
