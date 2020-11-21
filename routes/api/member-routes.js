const db = require('../../models');
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require('../../config/middleware/isAuthenticated');
// Requiring bcrypt for password hashing. Using the bcryptjs version as
// the regular bcrypt module sometimes causes errors on Windows machines
const bcrypt = require('bcryptjs');
const randomColor = require('randomcolor');
const nodemailer = require('nodemailer');

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

  // POST route for sending email
  app.post('/api/member/sendmessage', isAuthenticated, async (req, res) => {
    console.log(req.body.data);
    const {name, email, message} = req.body.data;
    const emailUrl = await main(name, email, message);

    res.status(200).json({emailUrl});
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
  /**
 * Checks the pasword contains a number.
 * @param {string} name user name.
 * @param {string} email user email.
 * @param {string} message the message.
 */
  async function main(name, email, message) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
    const testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: `"${name}" <${email}>`, // sender address
      to: '<spin.that.meal@hotmail.com>', // list of receivers
      subject: `Enquiry from ${name}`, // Subject line
      text: `${message}`, // plain text body
      html: `<b>${message}</b>`, // html body
    });
    // Preview only available when sending through an Ethereal account
    // open(nodemailer.getTestMessageUrl(info), function(err) {
    //   if ( err ) throw err;
    // });
    return nodemailer.getTestMessageUrl(info);
  }
};
