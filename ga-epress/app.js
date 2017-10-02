var express = require("express");
var app     = express();

// Set the view directory to /views
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"))

// Let's use the Express templating language
app.set("view engine", "ejs");

// app.all("*", function(request, response, next) {
//   response.writeHead(200, { "Content-Type": "text/plain" });
//   next();
// });

//the following calls are all `get` requests but they could just as easily be `post` or `put` or any HTTP verb.
app.get("/", function(request, response) {
  response.render("index", { message: "I love coding" });
});

app.get("/about", function(request, response) {
  response.end("Welcome to the about page!");
});

app.get("*", function(request, response) {
  response.end("404!");
});

app.listen(3000);
console.log("Express is up and running");
