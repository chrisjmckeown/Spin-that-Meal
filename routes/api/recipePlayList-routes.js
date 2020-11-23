const db = require('../../models');
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require('../../config/middleware/isAuthenticated');

module.exports = function(app) {
  // GET route for getting all items
  app.get('/api/recipe-playlist', isAuthenticated, (req, res) => {
    db.RecipePlaylist.findAll({
      include: [db.PlayList, db.Recipe],
    }).then((result) => {
      res.json({PlayList: result});
    });
  });

  // Get route for retrieving a single item
  app.get('/api/recipe-playlist/:id', isAuthenticated, (req, res) => {
    db.RecipePlaylist.findOne({
      where: {
        id: req.params.id,
      },
      include: [db.PlayList, db.Recipe],
    }).then((result) => {
      res.json( result);
    });
  });

  // POST route for saving new
  app.post('/api/recipe-playlist', isAuthenticated, (req, res) => {
    const {PlayListId, RecipeId} = req.body;
    db.RecipePlaylist.create({
      PlayListId, RecipeId,
    }).then((result) => {
      res.json(result);
    });
  });

  // PUT route for updating
  app.put('/api/recipe-playlist', isAuthenticated, (req, res) => {
    const {id, PlayListId, RecipeId} = req.body;
    db.RecipePlaylist.update({
      PlayListId, RecipeId,
    }, {
      where: {
        id: id,
      },
    }).then((result) => {
      res.json(result);
    });
  });

  // DELETE route for deleting
  app.delete('/api/recipe-playlist/:playlistId/:recipeId',
      isAuthenticated, (req, res) => {
        const {playlistId, recipeId} = req.params;
        db.RecipePlaylist.destroy({
          where: {
            PlayListId: playlistId,
            RecipeId: recipeId,
          },
        }).then((result) => {
          res.json(result);
        });
      });
};
