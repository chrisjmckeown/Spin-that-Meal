const db = require("../../models");

module.exports = function (app) {
    // GET route for getting all items
    app.get("/api/categories", (req, res) => {
        db.Category.findAll({}).then((result) => {
            res.json(result);
        });
    });

    // Get route for retrieving a single item
    app.get("/api/categories/:id", (req, res) => {
        db.Category.findOne({
            where: {
                id: req.params.id
            }
        }, (result) => {
            res.json(result);
        });
    });

    // POST route for saving new
    app.post("/api/categories", (req, res) => {
        const { name } = req.body;
        db.Category.create({ name }).then((result) => {
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