const db = require('../../models');
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require('../../config/middleware/isAuthenticated');

module.exports = function(app) {
  // GET route for getting all items
  app.get('/api/categories-list', isAuthenticated, (req, res) => {
    db.Category.findAll().then((result) => {
      res.json(result);
    });
  });

  // GET route for getting all items
  app.get('/api/categories', isAuthenticated, (req, res) => {
    db.Category.findAll().then((result) => {
      res.render('management/categories', {Category: result});
    });
  });

  // Get route for retrieving a single item
  app.get('/api/categories/:id', isAuthenticated, (req, res) => {
    db.Category.findOne({
      where: {
        id: req.params.id,
      },
    }).then((result) => {
      res.render('management/categories-edit', result);
    });
  });

  // POST route for saving new
  app.post('/api/categories', isAuthenticated, (req, res) => {
    const {name} = req.body;
    db.Category.create({
      name,
    }).then((result) => {
      res.json(result);
    });
  });

  // PUT route for updating
  app.put('/api/categories', isAuthenticated, (req, res) => {
    const {id, name} = req.body;
    db.Category.update({
      name,
    }, {
      where: {
        id: id,
      },
    }).then((result) => {
      res.json(result);
    });
  });

  // DELETE route for deleting
  app.delete('/api/categories/:id', isAuthenticated, (req, res) => {
    db.Category.destroy({
      where: {
        id: req.params.id,
      },
    }).then((result) => {
      res.json(result);
    });
  });

  // Get route for retrieving or creating if not find a single item
  app.get('/api/categories/:name', isAuthenticated, (req, res) => {
    db.Category.findOrCreate({
      where: {
        name: req.params.name,
      },
    }).then((result) => {
      res.json(result);
    });
  });
};

