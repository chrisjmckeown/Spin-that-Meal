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
          console.log(err);
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

    console.log(email);

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
        }).then(() => {
          main(email, password);
          // const resetEmail = {
          //   to: user.email,
          //   from: 'passwordreset@example.com',
          //   subject: 'Node.js Password Reset',
          //   text: `
          //     You are receiving this because you (or someone else) have requested the reset of the password for your account.
          //     Please click on the following link, or paste this into your browser to complete the process:
          //     http://${req.headers.host}/reset/${token}
          //     If you did not request this, please ignore this email and your password will remain unchanged.
          //   `,
          // };
          // await transport.sendMail(resetEmail);
          res.status(200).end();
        });
      } else {
        res.status(401).json({message: 'user not found'});
      }
    });
  });

  // async..await is not allowed in global scope, must use a wrapper
  async function main(email, password) {
    console.log('Sending message');
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
      from: '"Chris Mckeown" <chris.j.mckeown@hotmail.com>', // sender address
      to: email, // list of receivers
      subject: 'Spin-that-Meal Password reset', // Subject line
      text: `Hello, your new password is ${password}`, // plain text body
      html: `<b>Hello, your new password is ${password}</b>`, // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
};
