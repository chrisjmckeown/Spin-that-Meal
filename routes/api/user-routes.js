const db = require("../../models");
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../../config/middleware/isAuthenticated");

module.exports = function (app) {
    // GET route for getting all items
    app.get("/api/users", isAuthenticated, (req, res) => {
        db.User.findAll({}).then((result) => {
            res.json(result);
        });
    });

    // Get route for retrieving a single item
    app.get("/api/users/:id", isAuthenticated, (req, res) => {
        db.User.findOne({
            where: {
                id: req.params.id
            }
        }, (result) => {
            res.json(result);
        });
    });

    // POST route for saving new
    // app.post("/api/users", (req, res) => {
    //     const {  firstName, lastName, userName, email, phone, address  } = req.body;
    //     db.User.create({  firstName, lastName, userName, email, phone, address  }).then((result) => {
    //         res.json(result);
    //     });
    // });

    // PUT route for updating
    app.put("/api/users", isAuthenticated, (req, res) => {
        const {  firstName, lastName, userName, email, phone, address  } = req.body;
        db.User.update({
            firstName, lastName, userName, email, phone, address 
        }, {
            where: {
                id: req.body.id
            }
        }).then((result) => {
            res.json(result);
        });
    });

    // DELETE route for deleting
    app.delete("/api/users/:id", isAuthenticated, (req, res) => {
        db.User.destroy({
            where: {
                id: req.params.id
            }
        }).then((result) => {
            res.json(result);
        });
    });
};