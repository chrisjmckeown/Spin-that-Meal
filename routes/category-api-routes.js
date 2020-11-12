const db = require("../models");

module.exports = function (app) {
    // GET route for getting all items
    app.get("/api/categories", (req, res) => {
        // 1. Add a join to include all of each Author's Posts
        db.Author.findAll({
            include: [db.Category]
        }).then((result) => {
            res.json(result);
        });
    });

    // Get route for retrieving a single item
    app.get("/api/categories/:id", (req, res) => {
        // 2; Add a join to include all of the Author's Posts here
        db.Category.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Category]
        }).then((result) => {
            res.json(result);
        });
    });

    // POST route for saving new
    app.post("/api/categories", (req, res) => {
        db.Category.create(req.body).then((result) => {
            res.json(result);
        });
    });


    // PUT route for updating
    app.put("/api/categories", (req, res) => {
        const { name } = req.body;
        db.Category.update({
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
    app.delete("/api/categories/:id", (req, res) => {
        db.Category.destroy({
            where: {
                id: req.params.id
            }
        }).then((result) => {
            res.json(result);
        });
    });
};