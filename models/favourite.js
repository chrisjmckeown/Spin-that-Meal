module.exports = function (sequelize, DataTypes) {
    var Favourite = sequelize.define("Favourite", {
      user_id: {
        type: DataTypes.INTEGER
      },
      recipe_id: {
        type: DataTypes.INTEGER
      }
    });
  
    return Favourite;
  };
