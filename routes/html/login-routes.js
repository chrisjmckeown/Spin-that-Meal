// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

module.exports = function (app) {
    app.get("/", (req, res) => {
        // If the user already has an account send them to the app
        if (req.user) {
            res.render("index");
        }
        res.render("login");
    });

    app.get("/login", (req, res) => {
        // If the user already has an account send them to the app
        if (req.user) {
            res.render("index");
        }
        res.render("login");
    });
};
