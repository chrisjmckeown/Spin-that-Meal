const db = require('../../models');
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require('../../config/middleware/isAuthenticated');
// Requiring bcrypt for password hashing. Using the bcryptjs version as
// the regular bcrypt module sometimes causes errors on Windows machines
const bcrypt = require('bcryptjs');
const randomColor = require('randomcolor');

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

  // Get random colour
  app.get('/api/member/randomcolor', (req, res) => {
    res.json({messagecolour: randomColor()});
  });

  // Get route for the logged in member
  app.get('/api/member', (req, res) => {
    db.User.findOne({
      where: {
        id: req.user.id,
      },
    }).then((result) => {
      const userDetails = {
        id: result.id,
        firstName: result.firstName,
        lastName: result.lastName,
        userName: result.userName,
        email: result.email,
        phone: result.phone,
        address: result.address,
        admin: result.admin,
        messagecolour: result.messagecolour,
      };
      res.json(userDetails);
    });
  });

  // PUT route for updating
  app.put('/api/member', isAuthenticated, (req, res) => {
    const {
      id, firstName, lastName, userName, email, password, phone, address,
      changepassword, messagecolour,
    } = req.body;

    if (changepassword === 'false') {
      db.User.update({
        firstName, lastName, userName, email, phone, address, messagecolour,
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
        password: newPassword, phone, address, messagecolour,
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
