//by value (this is how primitives work)
var a = 3;
var b;

b = a; //this line copies the value of a and assignes it to b. As it has created something new in memory you a then able to do what you like with 'b' without affecting 'a'.

a = 2; //here we have changed the value of 'a' but have not affected 'b'. 'b' will still be 3.

// console.log(a);
// console.log(b);


//by reference (this is how all objects (including functions) work)

var c = { greeting: "hi" };
var d;

d = c; //this is not copying the object which is assigned to var c. It is just pointing var d in the direction of this object.

c.greeting = 'hello';
 // console.log('c: ' + c);
 // console.log('d: ' + d);

//by reference (even as parameters)
function changeGreeting(obj) {
  obj.greeting = 'Hola'; //mutate
}

changeGreeting(d);

// console.log(c);
// console.log(d);

// equals operator sets up a new space in memory:
c = { greeting: 'howdy' };
// console.log(c);





var x = {
   greeting1: 'Hello',
   greeting2: 'Oh Hello',
   greeting3: 'Good Day'
 };

console.log(x.greeting2);

var y = x;

console.log(y.greeting3);

function hi (greeting) {
  console.log(greeting.greeting1);
}


var x = {
  greeting1: 'Top of the morning'
};


hi(x);
hi(y);
