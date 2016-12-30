// function a() {
//   console.log(this);
//   this.newvariable = "hello";
// }
//
// var b = function() {
//   console.log(this);
// };
//
// a();
// b();
//
// console.log(newvariable);
//
// b();

var TheCObject = {
  name: "the c object",
  log: function() {
    var self = this; //At this point 'this' is TheCObject.
    this.name = "updated c object";
    console.log(this); //at this point 'this' is 'TheCObject'.

    var setname = function(newname) {
      this.name = newname; //at this point, even though we are in a function which is within a function which is within the object 'TheCObject', 'this' now refers to the window object.
    };
    setname ("Updated again. The C object");
    console.log(this); //at this point 'this' is set again to 'TheCObject'
  }
};

TheCObject.log();



var AnObject = {
  key1 : 'value1',
  log : function (updated) {
    var self = this; //assign 'this' to a var here for use later in the object.
    console.log(updated + self); //at this point 'this' is 'AnObject'
    var thisGetsWeird = function(updated) {
      console.log(updated + self); //this goes back to refering to the global object. Why? no one knows so you must use 'self' instead.
    };
    thisGetsWeird("updated again");
  }
};

AnObject.log("this is now self");
