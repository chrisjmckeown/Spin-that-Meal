
const db = require('../../models');
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require('../../config/middleware/isAuthenticated');

module.exports = function(app) {
  // GET route for getting all items
  app.get('/api/recipe-categories', isAuthenticated, (req, res) => {
    db.Recipe_Category.findAll({

    }).then((result) => {
      res.json(result);
    });
  });

  // Get route for retrieving a single item
  app.get('/api/recipe-categories/:id', isAuthenticated, (req, res) => {
    db.Recipe_Category.findOne({
      where: {
        id: req.params.id,
      },
    }).then((result) => {
      res.json(result);
    });
  });

  // POST route for saving new
  app.post('/api/recipe-categories', isAuthenticated, (req, res) => {
    const {CategoryId, RecipeId} = req.body;
    db.Recipe_Category.create({
      CategoryId, RecipeId,
    }).then((result) => {
      res.json(result);
    });
  });

  // PUT route for updating
  app.put('/api/recipe-categories/:id', isAuthenticated, (req, res) => {
    const {id, CategoryId, RecipeId} = req.body;
    db.Recipe_Category.update({
      CategoryId, RecipeId,
    }, {
      where: {
        id: id,
      },
    }).then((result) => {
      res.json(result);
    });
  });

  // DELETE route for deleting
  app.delete('/api/recipe-categories/:id', isAuthenticated, (req, res) => {
    db.Recipe_Category.destroy({
      where: {
        id: req.params.id,
      },
    }).then((result) => {
      res.json(result);
    });
  });
};
