const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  meta: {
    age: Number,
    website: String,
    address: String,
    country: String
  },
}, {
  timestamps: true
});

// custom method
// To give a real world scenario, when securely signing up a new user, you would create model method to encrypt the password given by the user so that it is not existing vulnerably in your database.
// userSchema.methods.sayHello = function() {
//   console.log("Hi " + this.firstName);
// };

//not working. error: `this.find is not a function`
// userSchema.statics.all = (callback) => {
//   return this.find({}, callback)
// }

//not firing. Don't know why
// you can define methods to help automatically populate key(s) of your model. For example:
userSchema.pre('save', (next) => {
  if (!this.firstName) {
    this.firstName = "Frank";
  }
  next();
});

module.exports = mongoose.model('user', userSchema)
