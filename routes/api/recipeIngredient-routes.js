const db = require("../../models");
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../../config/middleware/isAuthenticated");

module.exports = function (app) {
    // GET route for getting all items
    app.get("/api/recipe-ingredients", isAuthenticated, (req, res) => {
        db.RecipeIngredient.findAll({}).then((result) => {
            res.json(result);
        });
    });

    // Get route for retrieving a single item
    app.get("/api/recipe-ingredients/:id", isAuthenticated, (req, res) => {
        db.RecipeIngredient.findOne({
            where: {
                id: req.params.id
            }
        }).then ((result) => {
            res.json(result);
        });
    });

    // POST route for saving new
    app.post("/api/recipe-ingredients", isAuthenticated, (req, res) => {
        const { amount } = req.body;
        db.RecipeIngredient.create({ amount }).then((result) => {
            res.json(result);
        });
    });

    // PUT route for updating
    app.put("/api/recipe-ingredients", isAuthenticated, (req, res) => {
        const { amount } = req.body;
        db.RecipeIngredient.update({
            amount
        }, {
            where: {
                id: req.body.id
            }
        }).then((result) => {
            res.json(result);
        });
    });

    // DELETE route for deleting
    app.delete("/api/recipe-ingredients/:id", isAuthenticated, (req, res) => {
        db.RecipeIngredient.destroy({
            where: {
                id: req.params.id
            }
        }).then((result) => {
            res.json(result);
        });
    });
};