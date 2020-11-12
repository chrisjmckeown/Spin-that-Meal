const db = require("../models");

module.exports = function (app) {
    // GET route for getting all items
    app.get("/api/types", (req, res) => {
        db.Type.findAll({}).then((result) => {
            res.json(result);
        });
    });

    // Get route for retrieving a single item
    app.get("/api/types/:id", (req, res) => {
        db.Type.findOne({
            where: {
                id: req.params.id
            }
        }, (result) => {
            res.json(result);
        });
    });

    // POST route for saving new
    app.post("/api/types", (req, res) => {
        const { name } = req.body;
        db.Type.create({ name }).then((result) => {
            res.json(result);
        });
    });

    // PUT route for updating
    app.put("/api/types", (req, res) => {
        const { name } = req.body;
        db.Type.update({
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
    app.delete("/api/types/:id", (req, res) => {
        db.Type.destroy({
            where: {
                id: req.params.id
            }
        }).then((result) => {
            res.json(result);
        });
    });
};