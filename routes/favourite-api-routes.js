const db = require("../models");

module.exports = function (app) {
    // GET route for getting all items
    app.get("/api/favourite", (req, res) => {
        db.Favourite.findAll({}).then((result) => {
            res.json(result);
        });
    });

    // Get route for retrieving a single item
    app.get("/api/favourite/:id", (req, res) => {
        db.Favourite.findOne({
            where: {
                id: req.params.id
            }
        }, (result) => {
            res.json(result);
        });
    });

    // POST route for saving new
    app.post("/api/favourite", (req, res) => {
        db.Favourite.create().then((result) => {
            res.json(result);
        });
    });

    // DELETE route for deleting
    app.delete("/api/favourite/:id", (req, res) => {
        db.Favourite.destroy({
            where: {
                id: req.params.id
            }
        }).then((result) => {
            res.json(result);
        });
    });
};