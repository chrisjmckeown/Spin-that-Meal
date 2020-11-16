const db = require("../../models");
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../../config/middleware/isAuthenticated");

module.exports = function (app) {
    // GET route for getting all items
    app.get("/api/measurements", isAuthenticated, (req, res) => {
        db.Measurement.findAll({

        }).then((result) => {
            res.json(result);
        });
    });

    // Get route for retrieving a single item
    app.get("/api/measurements/:id", isAuthenticated, (req, res) => {
        db.Measurement.findOne({
            where: {
                id: req.params.id
            }
        }).then((result) => {
            res.json(result);
        });
    });

    // POST route for saving new
    app.post("/api/measurements", isAuthenticated, (req, res) => {
        const { unit } = req.body;
        db.Measurement.create({
            unit
        }).then((result) => {
            res.json(result);
        });
    });

    // PUT route for updating
    app.put("/api/measurements", isAuthenticated, (req, res) => {
        const { id, unit } = req.body;
        db.Measurement.update({
            unit
        }, {
            where: {
                id: id
            }
        }).then((result) => {
            res.json(result);
        });
    });

    // DELETE route for deleting
    app.delete("/api/measurements/:id", isAuthenticated, (req, res) => {
        db.Measurement.destroy({
            where: {
                id: req.params.id
            }
        }).then((result) => {
            res.json(result);
        });
    });
};