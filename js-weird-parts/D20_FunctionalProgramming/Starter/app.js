//----------------- using functional programming:
function mapForEach (arr, fn) {

  var newArr = [];

  for (var i = 0; i < arr1.length; i++) {

    newArr.push(
      fn(arr[i])
    );
  }
  return newArr;
}

var arr1 = [1,2,3];

console.log(arr1);

var arr2 = mapForEach(arr1, function(item) {
  return item % 2 === 0;
});

console.log(arr2);

var checkLimit = function(limiter, item) {
  return item > limiter;
};

//this is now being done with the check LimitSimple var
// var arr4 = mapForEach(arr1,  checkLimit.bind(this,1));

var checkLimitSimple = function(limiter) {
  return function(limiter, item) {
    return item > limiter;
  }.bind(this, limiter);
};

var arr5 = mapForEach(arr1, checkLimitSimple(2));
console.log("arr5: " + arr5);





//-------------------- the wet way:

//
// var arr1 = [1,2,3];
//
// console.log(arr1);
//
// var arr2 = [];
//
//  for (var i = 0; i < arr1.length; i++) {
//
//    arr2.push(arr1[i] * 2);
//
//  }
//
//  console.log(arr2);
