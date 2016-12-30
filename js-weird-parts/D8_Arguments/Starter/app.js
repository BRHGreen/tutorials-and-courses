function greet( firstName, lastName, language) {
  if (arguments.length === 0) {
    console.log("Missing paramiters!");
    return;
  }

  language  = arguments[2] || 'English';
  console.log("First name: " + arguments[0]);
  console.log("Last Name: " + arguments[1]);
  console.log("Language: " + language);

}

greet("Ben", "Green");
