const db = require("../models");

module.exports = function (app) {
    // GET route for getting all items
    app.get("/api/recipe-ingredients", (req, res) => {
        db.RecipeIngredient.findAll({}).then((result) => {
            res.json(result);
        });
    });

    // Get route for retrieving a single item
    app.get("/api/recipe-ingredients/:id", (req, res) => {
        db.RecipeIngredient.findOne({
            where: {
                id: req.params.id
            }
        }, (result) => {
            res.json(result);
        });
    });

    // POST route for saving new
    app.post("/api/recipe-ingredients", (req, res) => {
        const { amount } = req.body;
        db.RecipeIngredient.create({ amount }).then((result) => {
            res.json(result);
        });
    });

    // PUT route for updating
    app.put("/api/recipe-ingredients", (req, res) => {
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
    app.delete("/api/recipe-ingredients/:id", (req, res) => {
        db.RecipeIngredient.destroy({
            where: {
                id: req.params.id
            }
        }).then((result) => {
            res.json(result);
        });
    });
};