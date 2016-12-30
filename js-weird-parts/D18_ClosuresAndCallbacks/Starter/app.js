function sayHiLater() {
  var greeting = "hi";

  setTimeout(function() {
    console.log(greeting);

  }, 3000);
}

sayHiLater();

//callback:
function tellMeWhenDone(callback) {

  var a = 1000; //Some work. Could be anything
  var b = 2000;

  callback();
}

tellMeWhenDone(function() {
  console.log('I am done');

});

tellMeWhenDone(function() {
  console.log("I am also done");
});
