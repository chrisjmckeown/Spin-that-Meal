const db = require('../../models');
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require('../../config/middleware/isAuthenticated');

module.exports = function(app) {
  // GET route for getting all items
  app.get('/api/types', isAuthenticated, (req, res) => {
    db.Type.findAll().then((result) => {
      res.render('management/types', {Type: result});
    });
  });

  // Get route for retrieving a single item
  app.get('/api/types/:id', isAuthenticated, (req, res) => {
    db.Type.findOne({
      where: {
        id: req.params.id,
      },
    }).then((result) => {
      res.render('management/types-edit', result);
    });
  });

  // POST route for saving new
  app.post('/api/types', isAuthenticated, (req, res) => {
    const {name} = req.body;
    db.Type.create({
      name,
    }).then((result) => {
      res.json(result);
    });
  });

  // PUT route for updating
  app.put('/api/types', isAuthenticated, (req, res) => {
    const {id, name} = req.body;
    db.Type.update({
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
  app.delete('/api/types/:id', isAuthenticated, (req, res) => {
    db.Type.destroy({
      where: {
        id: req.params.id,
      },
    }).then((result) => {
      res.json(result);
    });
  });
};
