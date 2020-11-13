module.exports = function (sequelize, DataTypes) {
    var Archive = sequelize.define("Archive", {
      user_id: {
        type: DataTypes.INTEGER
      },
      recipe_id: {
        type: DataTypes.INTEGER
      }
    });
  
    return Archive;
  };