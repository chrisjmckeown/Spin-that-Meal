const db = require('../../models');
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require('../../config/middleware/isAuthenticated');

module.exports = function(app) {
  // GET route for getting all items
  app.get('/api/ingredients-list', isAuthenticated, (req, res) => {
    db.Ingredient.findAll({
      order: [
        ['name', 'ASC'],
      ],
      include: [db.Type],
    }).then((result) => {
      res.json(result);
    });
  });

  // GET route for getting all items
  app.get('/api/ingredients', isAuthenticated, (req, res) => {
    db.Ingredient.findAll({
      order: [
        ['name', 'ASC'],
      ],
      include: [db.Type],
    }).then((result) => {
      res.render('management/ingredients', {Ingredient: result});
    });
  });

  // Get route for retrieving a single item
  app.get('/api/ingredients/:id', isAuthenticated, (req, res) => {
    db.Ingredient.findOne({
      where: {
        id: req.params.id,
      }, include: [db.Type],
    }).then((result) => {
      res.render('management/ingredients-edit', result);
    });
  });

  // Get route for retrieving or creating if not find a single item
  app.get('/api/ingredients/:name', isAuthenticated, (req, res) => {
    db.Category.findOrCreate({
      where: {
        name: req.params.name,
      },
    }).then((result) => {
      res.json(result);
    });
  });

  // POST route for saving new
  app.post('/api/ingredients', isAuthenticated, (req, res) => {
    const {name, TypeId} = req.body;
    db.Ingredient.create({
      name, TypeId,
    }).then((result) => {
      res.json(result);
    });
  });

  // PUT route for updating
  app.put('/api/ingredients', isAuthenticated, (req, res) => {
    const {id, name, TypeId} = req.body;
    db.Ingredient.update({
      name, TypeId,
    }, {
      where: {
        id: id,
      },
    }).then((result) => {
      res.json(result);
    });
  });

  // DELETE route for deleting
  app.delete('/api/ingredients/:id', isAuthenticated, (req, res) => {
    db.Ingredient.destroy({
      where: {
        id: req.params.id,
      },
    }).then((result) => {
      res.json(result);
    });
  });
};
