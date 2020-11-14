// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../../config/middleware/isAuthenticated");

module.exports = function(app) {
    app.get("/index", isAuthenticated , (req, res) => {
        res.render("index", "");
    });
  };