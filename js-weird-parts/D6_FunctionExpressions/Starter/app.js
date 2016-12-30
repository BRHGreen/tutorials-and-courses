// anonumousGreet(); if this were invoked here it would error. This because it knows there is a var 'anonumousGreet' but bacuase you are invoking it before it has a chance to know what the var is set to it will still have the 'placeholder value' of undefined so you are essentially doing this: undefined(); which obviously doesn't work.

var anonumousGreet = function() {
  console.log('hi');
};

function greet() {
  console.log('hi');
}


function log(a) {
  a();
}

log(function () {
  console.log('hi');
});
