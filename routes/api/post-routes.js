const db = require('../../models');
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require('../../config/middleware/isAuthenticated');

module.exports = function(app) {
  // GET route for getting all of the posts
  app.get('/api/posts', isAuthenticated, (req, res) => {
    db.Post.findAll({
      include: [db.User],
    }).then((result) => {
      res.json(result);
    });
  });

  // Get route for retrieving a single post
  app.get('/api/posts/:id', isAuthenticated, (req, res) => {
    db.Post.findOne({
      where: {
        id: req.params.id,
      },
      include: [db.User],
    }).then((result) => {
      res.json(result);
    });
  });

  // POST route for saving new
  app.post('/api/posts', isAuthenticated, (req, res) => {
    const {UserId, message} = req.body;
    db.Post.create({message, UserId}).then((result) => {
      res.json(result);
    });
  });

  // PUT route for updating
  app.put('/api/posts/:id', isAuthenticated, (req, res) => {
    const {message} = req.body;
    db.Post.update(
        message,
        {
          where: {
            id: req.params.id,
          },
        }).then((result) => {
      res.json(result);
    });
  });

  // DELETE route for deleting
  app.delete('/api/posts/:id', isAuthenticated, (req, res) => {
    db.Post.destroy({
      where: {
        id: req.params.id,
      },
    }).then((result) => {
      res.json(result);
    });
  });
};
