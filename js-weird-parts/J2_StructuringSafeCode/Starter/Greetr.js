//first we create an IIFE to which we pass the global/window object and the jQ lib.
(function (global, $) {

//here we are setting up a constructor which will mean that we don't have to specify 'new' every time we want to create a new greeting. We can just call Greeter

  var Greeter = function(firstname, lastname, language) {
    return new Greeter.init (firstname, lastname, language);
    };
//because of the closure of the lexical env these variables will be available inside this object but not outside
    var supportedLangs = ["en", "es"];

    var greetings = {
      en: "Hello",
      es: "Hola"
    };

    var formalGreetings = {
      en: "Greetings",
      es: "Saludos"
    };

    var logMessages = {
      en: "Logged in",
      es: "Inicio sesion"
    };

//this is where we are going to put the methods which will be available throughout the Library
    Greeter.prototype = {

      fullname: function () {
        return this.firstname + " " + this.lastname;
      },

      validate: function() {
        if (supportedLangs.indexOf(this.language) === -1) {
          throw "Invalid language";
        }
      },

      greeting: function() {
        return greetings[this.language] + " " + this.firstname;
      },

      formalGreeting: function() {
        return formalGreetings[this.language] + " " + this.fullname();
      },

      greet: function(formal) {
        var msg;

        //if undifined or null it will be coerced to "false"
        if (formal) {
          msg = this.formalGreeting();
        } else {
          msg = this.greeting();
        }

        if (console) {
          console.log(msg);
        }
        //"this" refers to the calling object at execution time and so makes the method chainable
        return this;

      },

      log: function() {
        if (console) {
          console.log(logMessages[this.language] + ": " + this.fullname);
        }
        return this;
      },

      setLang: function(lang) {
        this.language = lang;
        this.validate();
        return this;
      },

      HTMLGreeting: function(selector, formal) {
        if(!$) {
          throw "jQuery not loaded";
        }
        if(!selector) {
          throw "Missing jQuery selector";
        }

        var msg;
        if (formal) {
          msg = this.formalGreeting();
        } else {
          msg = this.greeting();
        }

        $(selector).html(msg);

        return this;
      }

    };

//here we invoke our Greeter.init constructor
    Greeter.init = function(firstname, lastname, language) {

//making sure that 'this' always refers to this object
      var self = this;

//setting some default values
      self.firstname  = firstname || "";
      self.lastname   = lastname  || "";
      self.language   = language  || "en";

      self.validate();
    };


//making sure that the prototype points to the object we set up as a prototype on line 11
    Greeter.init.prototype = Greeter.prototype;

//attatching the Greeter object to the window using the global argument we passed.
//also setting the alias G$
    global.Greeter = global.G$ = Greeter;

}(window, $));
