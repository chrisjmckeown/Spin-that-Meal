const db = require('../../models');
const passport = require('../../config/passport');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post('/api/login', passport.authenticate('local'), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    db.User.findOne({
      where: {
        id: req.user.id,
      },
    }).then((result) => {
      res.json({
        id: result.id,
        email: result.email,
        firstName: result.firstName,
        lastName: result.lastName,
        userName: result.userName,
      });
    });
  });

  // Route for signing up a user. The user's password is
  // automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user
  // is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post('/api/signup', (req, res) => {
    const {
      firstName, lastName, userName, email, password, phone, address,
    } = req.body;

    db.User.create({
      firstName, lastName, userName, email, password, phone, address,
    }).then((result) => {
      res.redirect(307, '/api/login');
    })
        .catch((err) => {
          res.status(401).json(err);
        });
  });

  // Route for logging user out
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.post('/api/forgotpassword', (req, res) => {
    const {email} = req.body;

    db.User.findOne({
      where: {
        email: email,
      },
    }).then((result) => {
      if (result) {
        const password = '!2345ABC';
        const newPassword = bcrypt.hashSync(
            password,
            bcrypt.genSaltSync(10),
            null,
        );
        db.User.update({
          password: newPassword,
        }, {
          where: {
            email,
          },
        }).then(async () => {
          const emailUrl = await main(email, password);

          res.status(200).json({emailUrl});
        });
      } else {
        res.status(401).json({message: 'user not found'});
      }
    });
  });

  /**
 * Checks the pasword contains a number.
 * @param {string} email user email.
 * @param {string} password reset password.
 */
  async function main(email, password) {
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
      from: '"Admin" <spin.that.meal@hotmail.com>', // sender address
      to: email, // list of receivers
      subject: 'Spin-that-Meal Password reset', // Subject line
      text: `Hello, your new password is ${password}`, // plain text body
      html: `<b>Hello, your new password is ${password}</b>`, // html body
    });
    // Preview only available when sending through an Ethereal account
    // open(nodemailer.getTestMessageUrl(info), function(err) {
    //   if ( err ) throw err;
    // });
    return nodemailer.getTestMessageUrl(info);
  }
};
