const db = require("../../models");
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../../config/middleware/isAuthenticated");

module.exports = function (app) {
    // GET route for getting all items
    app.get("/api/recipes", isAuthenticated, (req, res) => {
        db.Recipe.findAll({}).then((result) => {
            res.json(result);
        });
    });

    // Get route for retrieving a single item
    app.get("/api/recipes/:id", isAuthenticated, (req, res) => {
        db.Recipe.findOne({
            where: {
                id: req.params.id
            }
        }, (result) => {
            res.json(result);
        });
    });

    // POST route for saving new
    app.post("/api/recipes", isAuthenticated, (req, res) => {
        const { name, instruction, portion } = req.body;
        db.Recipe.create({ name, instruction, portion }).then((result) => {
            res.json(result);
        });
    });

    // PUT route for updating
    app.put("/api/recipes", isAuthenticated, (req, res) => {
        const { name, instruction, portion } = req.body;
        db.Recipe.update({
            name, instruction, portion
        }, {
            where: {
                id: req.body.id
            }
        }).then((result) => {
            res.json(result);
        });
    });

    // DELETE route for deleting
    app.delete("/api/recipes/:id", isAuthenticated, (req, res) => {
        db.Recipe.destroy({
            where: {
                id: req.params.id
            }
        }).then((result) => {
            res.json(result);
        });
    });
};