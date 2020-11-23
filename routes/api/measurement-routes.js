const db = require('../../models');
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require('../../config/middleware/isAuthenticated');

module.exports = function(app) {
  // GET route for getting all items
  app.get('/api/measurements', isAuthenticated, (req, res) => {
    db.Measurement.findAll().then((result) => {
      res.json(result);
    });
  });

  // GET route for getting all items
  app.get('/api/measurements-management', isAuthenticated, (req, res) => {
    db.Measurement.findAll().then((result) => {
      res.render('management/measurements', {Measurement: result});
    });
  });

  // Get route for retrieving a single item
  app.get('/api/measurements/:id', isAuthenticated, (req, res) => {
    db.Measurement.findOne({
      where: {
        id: req.params.id,
      },
    }).then((result) => {
      res.render('management/measurements-edit', result);
    });
  });

  // POST route for saving new
  app.post('/api/measurements', isAuthenticated, (req, res) => {
    const {name} = req.body;
    db.Measurement.create({
      name,
    }).then((result) => {
      res.json(result);
    });
  });

  // PUT route for updating
  app.put('/api/measurements', isAuthenticated, (req, res) => {
    const {id, name} = req.body;
    db.Measurement.update({
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
  app.delete('/api/measurements/:id', isAuthenticated, (req, res) => {
    db.Measurement.destroy({
      where: {
        id: req.params.id,
      },
    }).then((result) => {
      res.json(result);
    });
  });
};
