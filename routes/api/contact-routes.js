const db = require('../../models');

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require('../../config/middleware/isAuthenticated');
const nodemailer = require('nodemailer');

module.exports = function(app) {
  // GET route for getting all items
  app.get('/api/contact', isAuthenticated, (req, res) => {
    db.User.findAll({
      where: {
        admin: true,
      },
    }).then((result) => {
      res.render('primary-pages/contact', {User: result});
    });
  });

  // POST route for sending email
  app.post('/api/contact/sendmessage', isAuthenticated, async (req, res) => {
    const {name, email, message} = req.body.data;
    const emailUrl = await main(name, email, message);

    res.status(200).json({emailUrl});
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
    return nodemailer.getTestMessageUrl(info);
  };
};
