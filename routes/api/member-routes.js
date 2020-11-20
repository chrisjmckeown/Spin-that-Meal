const db = require('../../models');
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require('../../config/middleware/isAuthenticated');
// Requiring bcrypt for password hashing. Using the bcryptjs version as
// the regular bcrypt module sometimes causes errors on Windows machines
const bcrypt = require('bcryptjs');

module.exports = function(app) {
  // Get route for the logged in member
  app.get('/api/member/edit', (req, res) => {
    db.User.findOne({
      where: {
        id: req.user.id,
      },
    }).then((result) => {
      res.render('primary-pages/member-edit', result);
    });
  });

  // PUT route for updating
  app.put('/api/member', isAuthenticated, (req, res) => {
    const {
      id, firstName, lastName, userName, email, password, phone, address,
      changepassword,
    } = req.body;
    if (!changepassword) {
      db.User.update({
        firstName, lastName, userName, email, phone, address,
      }, {
        where: {
          id,
        },
      }).then((result) => {
        res.json(result);
      });
    } else {
      const newPassword = bcrypt.hashSync(
          password,
          bcrypt.genSaltSync(10),
          null,
      );
      db.User.update({
        firstName, lastName, userName, email,
        password: newPassword, phone, address,
      }, {
        where: {
          id,
        },
      }).then(() => {
        res.status(200).end();
      });
    }
  });
};
