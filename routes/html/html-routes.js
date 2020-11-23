// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require('../../config/middleware/isAuthenticated');

module.exports = function(app) {
  app.get('/index', isAuthenticated, (req, res) => {
    res.render('index', '');
  });
  app.get('/starred', isAuthenticated, (req, res) => {
    res.render('primary-pages/starred', '');
  });
  app.get('/playlist', isAuthenticated, (req, res) => {
    res.render('primary-pages/playlist', '');
  });
  app.get('/recipe', isAuthenticated, (req, res) => {
    res.render('primary-pages/recipe', '');
  });
  app.get('/member-edit', isAuthenticated, (req, res) => {
    res.render('primary-pages/member-edit', '');
  });
  app.get('/contact', isAuthenticated, (req, res) => {
    res.render('primary-pages/contact', '');
  });
  app.get('/about', isAuthenticated, (req, res) => {
    res.render('primary-pages/about', '');
  });
  app.get('/create-recipe', isAuthenticated, (req, res) => {
    res.render('partials/create-recipe', '');
  });
};
