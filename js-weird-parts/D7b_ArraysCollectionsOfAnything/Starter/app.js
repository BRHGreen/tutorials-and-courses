var arr = [
  1,
  false,
  {
    name: 'Benedict',
    city: 'London'
  },
  function (name) {
    var greeting = 'Hi';
    console.log(greeting + " " + name);
  },
  'what, all of that in one array?'
];
arr[3](arr[2].name);
