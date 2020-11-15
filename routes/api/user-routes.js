const db = require("../../models");
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../../config/middleware/isAuthenticated");
// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
const bcrypt = require("bcryptjs");

module.exports = function (app) {
    // GET route for getting all items
    app.get("/api/users", isAuthenticated, (req, res) => {
        db.User.findAll({

        }).then((result) => {
            res.render("management/users", { User: result });
        });
    });

    // Get route for retrieving a single item
    app.get("/api/users/:id", (req, res) => {
        db.User.findOne({
            where: {
                id: req.params.id
            }
        }).then((result) => {
            res.render("management/users-edit", result);
        });
    });

    // POST route for saving new
    app.post("/api/users", (req, res) => {
        const { firstName, lastName, userName, email, phone, address } = req.body;
        db.User.create({
            firstName, lastName, userName, email, phone, address
        }).then((result) => {
            res.json(result);
        });
    });

    // PUT route for updating
    app.put("/api/users", isAuthenticated, (req, res) => {
        const { id, firstName, lastName, userName, email, phone, address } = req.body;

        db.User.update({
            firstName, lastName, userName, email, phone, address
        }, {
            where: {
                id
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

    // Get route for the logged in member
    app.get("/api/member/:id", (req, res) => {
        db.User.findOne({
            where: {
                id: req.params.id
            }
        }).then((result) => {
            res.render("management/member-edit", result);
        });
    });

    // PUT route for updating
    app.put("/api/member", isAuthenticated, (req, res) => {
        const { id, firstName, lastName, userName, email, phone, address } = req.body;
        let password = req.body.password;
        if (password === "") {
            db.User.update({
                firstName, lastName, userName, email, phone, address
            }, {
                where: {
                    id
                }
            }).then((result) => {
                res.json(result);
            });
        }
        else {
            password = bcrypt.hashSync(
                password,
                bcrypt.genSaltSync(10),
                null
            );
            db.User.update({
                firstName, lastName, userName, email, password, phone, address
            }, {
                where: {
                    id
                }
            }).then((result) => {
                res.status(200).end();
            });
        }
    });
};