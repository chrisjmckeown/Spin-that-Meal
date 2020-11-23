const db = require('../../models');
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require('../../config/middleware/isAuthenticated');

module.exports = function(app) {
  // GET route for getting all items
  app.get('/api/pantries', isAuthenticated, (req, res) => {
    db.Recipe.findAll().then((result) => {
      res.render('management/pantries', {Recipe: result});
    });
  });

  // Get route for retrieving a single item
  app.get('/api/pantries/:id', isAuthenticated, (req, res) => {
    db.Recipe.findOne({
      where: {
        id: req.params.id,
      },
    }).then((result) => {
      res.render('management/pantries-edit', result);
    });
  });

  // POST route for saving new
  app.post('/api/pantries', isAuthenticated, (req, res) => {
    const {name, instruction, portion, UserId} = req.body;
    db.Recipe.create({
      name, instruction, portion, UserId,
    }).then((result) => {
      res.json(result);
    });
  });

  // PUT route for updating
  app.put('/api/pantries', isAuthenticated, (req, res) => {
    const {id, name, instruction, portion, UserId} = req.body;
    db.Recipe.update({
      name, instruction, portion, UserId,
    }, {
      where: {
        id: id,
      },
    }).then((result) => {
      res.json(result);
    });
  });

  // DELETE route for deleting
  app.delete('/api/pantries/:id', isAuthenticated, (req, res) => {
    db.Recipe.destroy({
      where: {
        id: req.params.id,
      },
    }).then((result) => {
      res.json(result);
    });
  });
};
