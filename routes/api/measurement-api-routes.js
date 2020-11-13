const db = require("../../models");

module.exports = function (app) {
    // GET route for getting all items
    app.get("/api/measurements", (req, res) => {
        db.Measurement.findAll({}).then((result) => {
            res.json(result);
        });
    });

    // Get route for retrieving a single item
    app.get("/api/measurements/:id", (req, res) => {
        db.Measurement.findOne({
            where: {
                id: req.params.id
            }
        }, (result) => {
            res.json(result);
        });
    });

    // POST route for saving new
    app.post("/api/measurements", (req, res) => {
        const { unit } = req.body;
        db.Measurement.create({ unit }).then((result) => {
            res.json(result);
        });
    });

    // PUT route for updating
    app.put("/api/measurements", (req, res) => {
        const { unit } = req.body;
        db.Measurement.update({
            unit
        }, {
            where: {
                id: req.body.id
            }
        }).then((result) => {
            res.json(result);
        });
    });

    // DELETE route for deleting
    app.delete("/api/measurements/:id", (req, res) => {
        db.Measurement.destroy({
            where: {
                id: req.params.id
            }
        }).then((result) => {
            res.json(result);
        });
    });
};