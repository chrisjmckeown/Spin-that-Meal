const db = require("../models");

module.exports = function (app) {
    // GET route for getting all items
    app.get("/api/users", (req, res) => {
        db.User.findAll({}).then((result) => {
            res.json(result);
        });
    });

    // Get route for retrieving a single item
    app.get("/api/users/:id", (req, res) => {
        db.User.findOne({
            where: {
                id: req.params.id
            }
        }, (result) => {
            res.json(result);
        });
    });

    // POST route for saving new
    app.post("/api/users", (req, res) => {
        const { name , email, phone, address} = req.body;
        db.User.create({ name , email, phone, address }).then((result) => {
            res.json(result);
        });
    });

    // PUT route for updating
    app.put("/api/users", (req, res) => {
        const { name , email, phone, address } = req.body;
        db.User.update({
            name , email, phone, address
        }, {
            where: {
                id: req.body.id
            }
        }).then((result) => {
            res.json(result);
        });
    });

    // DELETE route for deleting
    app.delete("/api/users/:id", (req, res) => {
        db.User.destroy({
            where: {
                id: req.params.id
            }
        }).then((result) => {
            res.json(result);
        });
    });
};