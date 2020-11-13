const db = require("../../models");

module.exports = function (app) {
    // GET route for getting all items
    app.get("/api/shopping-lists", (req, res) => {
        db.ShoppingList.findAll({}).then((result) => {
            res.json(result);
        });
    });

    // Get route for retrieving a single item
    app.get("/api/shopping-lists/:id", (req, res) => {
        db.ShoppingList.findOne({
            where: {
                id: req.params.id
            }
        }, (result) => {
            res.json(result);
        });
    });

    // POST route for saving new
    app.post("/api/shopping-lists", (req, res) => {
        const { amount } = req.body;
        db.ShoppingList.create({ amount }).then((result) => {
            res.json(result);
        });
    });

    // PUT route for updating
    app.put("/api/shopping-lists", (req, res) => {
        const { amount } = req.body;
        db.ShoppingList.update({
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
    app.delete("/api/shopping-lists/:id", (req, res) => {
        db.ShoppingList.destroy({
            where: {
                id: req.params.id
            }
        }).then((result) => {
            res.json(result);
        });
    });
};