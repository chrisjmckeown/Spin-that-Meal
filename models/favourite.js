module.exports = function (sequelize, DataTypes) {
  const Favourite = sequelize.define("Favourite", {
      user_id: {
        type: DataTypes.INTEGER
      },
      recipe_id: {
        type: DataTypes.INTEGER
      }
    },
    {
      freezeTableName: true
    });
  
    return Favourite;
  };