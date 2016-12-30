function makeGreeting(language) {

  return function (firstName, lastName) {
    if (language === 'en') {
      console.log('Hello ' + firstName + ' ' + lastName);
    }
    if (language === 'es') {
      console.log('Hola ' + firstName + ' ' + lastName);
    }
  };
}

//these two variables are creating two different execution contexts even though they are invoking the same function. So the top one is invoking makeGreeting and passing it 'en'...
var greetEnglish = makeGreeting('en');

//...so now makeGreeting has been invoked on line 14. makeGreeting has been popped and returned a function and, when greetEnglish is called this function creates its own closure. Within this closure the information `language = 'en'` is stored
//We can now treat greetEnglish like a function and give it the variables which the function returned by `makeGreeting` wants.
greetEnglish('Ben', 'Green');

//And we can do this whole process again because when we do this...
var greetSpanish = makeGreeting('es');
//...makeGreeting has returned a seperate function in a seperate memory allocation
greetSpanish('Ben', 'el Greeno');
