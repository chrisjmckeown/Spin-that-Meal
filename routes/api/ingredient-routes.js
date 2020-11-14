const db = require("../../models");
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../../config/middleware/isAuthenticated");

module.exports = function (app) {
    // GET route for getting all items
    app.get("/api/ingredients", isAuthenticated, (req, res) => {
        db.Ingredient.findAll({}).then((result) => {
            res.json(result);
        });
    });

    // Get route for retrieving a single item
    app.get("/api/ingredients/:id", isAuthenticated, (req, res) => {
        db.Ingredient.findOne({
            where: {
                id: req.params.id
            }
        }).then ((result) => {
            res.json(result);
        });
    });

    // POST route for saving new
    app.post("/api/ingredients", isAuthenticated, (req, res) => {
        const { name } = req.body;
        db.Ingredient.create({ name }).then((result) => {
            res.json(result);
        });
    });

    // PUT route for updating
    app.put("/api/ingredients", isAuthenticated, (req, res) => {
        const { name } = req.body;
        db.Ingredient.update({
            name
        }, {
            where: {
                id: req.body.id
            }
        }).then((result) => {
            res.json(result);
        });
    });

    // DELETE route for deleting
    app.delete("/api/ingredients/:id", isAuthenticated, (req, res) => {
        db.Ingredient.destroy({
            where: {
                id: req.params.id
            }
        }).then((result) => {
            res.json(result);
        });
    });
};