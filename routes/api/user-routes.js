const db = require('../../models');
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require('../../config/middleware/isAuthenticated');
const bcrypt = require('bcryptjs');

module.exports = function(app) {
  // GET route for getting all items
  app.get('/api/users', isAuthenticated, (req, res) => {
    db.User.findAll().then((result) => {
      res.render('management/users', {User: result});
    });
  });

  // GET route for getting all items
  app.get('/api/users-in-list', isAuthenticated, (req, res) => {
    db.User.findAll().then((result) => {
      res.json({User: result});
    });
  });

  // Get route for retrieving a single item
  app.get('/api/users/:id', (req, res) => {
    db.User.findOne({
      where: {
        id: req.params.id,
      },
    }).then((result) => {
      res.render('management/users-edit', result);
    });
  });

  // POST route for saving new
  app.post('/api/users', (req, res) => {
    const {firstName, lastName, userName, email, phone, address} = req.body;
    db.User.create({
      firstName, lastName, userName, email, phone, address,
    }).then((result) => {
      res.json(result);
    });
  });

  // PUT route for updating
  app.put('/api/users', isAuthenticated, (req, res) => {
    const {
      id, firstName, lastName, userName, email, password, phone, address,
      admin, changepassword,
    } = req.body;
    if (changepassword === 'false') {
      db.User.update({
        firstName, lastName, userName, email, phone, address, admin,
      }, {
        where: {
          id,
        },
      }).then(() => {
        res.status(200).end();
      });
    } else {
      const newPassword = bcrypt.hashSync(
          password,
          bcrypt.genSaltSync(10),
          null,
      );
      db.User.update({
        firstName, lastName, userName, email,
        password: newPassword, phone, address, admin,
      }, {
        where: {
          id,
        },
      }).then(() => {
        res.status(200).end();
      });
    }
  });

  // DELETE route for deleting
  app.delete('/api/users/:id', isAuthenticated, (req, res) => {
    db.User.destroy({
      where: {
        id: req.params.id,
      },
    }).then((result) => {
      res.json(result);
    });
  });
};
