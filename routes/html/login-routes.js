module.exports = function(app) {
  app.get('/', (req, res) => {
    // If the user already has an account send them to the app
    if (req.user) {
      res.render('index');
    }
    res.render('login');
  });

  app.get('/login', (req, res) => {
    // If the user already has an account send them to the app
    if (req.user) {
      res.render('index');
    }
    res.render('login');
  });
};
