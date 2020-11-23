const db = require('../../models');
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require('../../config/middleware/isAuthenticated');

module.exports = function(app) {
  // GET route for getting all items
  app.get('/api/favourite', isAuthenticated, (req, res) => {
    db.Favourite.findAll().then((result) => {
      res.json(result);
    });
  });

  // Get route for retrieving a single item
  app.get('/api/favourite/:id', isAuthenticated, (req, res) => {
    db.Favourite.findOne({
      where: {
        id: req.params.id,
      },
    }).then((result) => {
      res.json(result);
    });
  });

  // POST route for saving new
  app.post('/api/favourite', isAuthenticated, (req, res) => {
    db.Favourite.create().then((result) => {
      res.json(result);
    });
  });

  // DELETE route for deleting
  app.delete('/api/favourite/:id', isAuthenticated, (req, res) => {
    db.Favourite.destroy({
      where: {
        id: req.params.id,
      },
    }).then((result) => {
      res.json(result);
    });
  });
};
