// Requiring necessary npm packages
const express = require("express");
// const session = require("express-session");
// const passport = require("./config/passport");
const exphbs = require("express-handlebars");
// Setting the models
const db = require("./models");

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;

// Creating express app
const app = express();

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Configuring middleware needed for authentication
// app.use(
//     session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
// );
// app.use(passport.initialize());
// app.use(passport.session());

// Set Handlebars.

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Requiring our routes
require("./routes/html-routes.js")(app);
//require("./routes/api-routes.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        // Log (server-side) when our server has started
        console.log("Server listening on: http://localhost:" + PORT);
    });
});
