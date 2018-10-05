// DEPENDENCIES | PACKAGES
var express = require("express");
var bodyParser = require("body-parser");

// Tells node that we are creating an "express" server
var app = express();

// Setup port to listen on
var PORT = process.env.PORT || 8080;

// Standard BodyParser scripts
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Require routes
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// Start server and port listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
