const mongoose    = require("mongoose");
const databaseURL = "mongodb://localhost/family-tree";
const User = require('./models/user')

mongoose.connect(databaseURL, { useMongoClient: true });

const person = new User({
  firstName: 'dave',
  meta: {
    age: 29
  },
  email: 'dave@dave.com'
})

// save user
// person.save((err, user) => {
//   if (err) return console.log(err);
//   return console.log('User was created', user);
// })

// Get all of the users
// User.find({}, (err, users) => {
//   if (err) return console.log(err);
//   return console.log(users);
// });

// Get one User
// User.findById("59c66825d960945f6a49728f", (err, user) => {
//   if (err) return console.log(err);
//   return console.log(user);
// })

// Update
// User.findByIdAndUpdate("59c66825d960945f6a49728f", {
//   meta: { age: 31 }
// }, {
//   new: true
// }, (err, user) => {
//   if (err) return console.log(err);
//   return console.log(user);
// })

/*this didn't work when I ran it*/
// To break this down in to separate variables, to look at how you are passing arguments to the findByIdAndUpdate function:
// var id = "59c66825d960945f6a49728f";
// var user = {
//   meta: { age: 32 }
// }
//To return the newly updated object, you can pass the optional object: { new: true } without this, you will get the old object before the changes.
// var newTrue = {
//   new: true
// }
// var callbackFunction = (err, user) => {
//   if (err) return console.log(err);
//   return console.log(user);
// }
//
// User.findByIdAndUpdate(id, user, newTrue, callbackFunction);


// User.findByIdAndRemove("57c6d9d9ff98c8154d99df95", err => {
//   if (err) return console.log(err);
//   return console.log("Deleted!")
// });

// User.findOne(function(err, user){
//   if (err) return console.log(err);
//   console.log(user)
//   user.sayHello();
// })

//calling the statics in user model but it's not working
// User.all((err, users) => {
//   if (err) return console.log(err);
//   return console.log(users);
// });
