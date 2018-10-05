// DEPENDENCIES
var path = require("path");

// Routes
// to survey page otherwise to home page
module.exports = function(app) {

  app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "/../public/survey.html"));
  });

  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/../public/home.html"));
  });

};
