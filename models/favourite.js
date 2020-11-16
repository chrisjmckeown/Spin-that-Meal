module.exports = function (sequelize, DataTypes) {
  const Favourite = sequelize.define("Favourite", {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "id"
        }
      },
      recipe_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Recipe" ,
          key: "id"
        }
      }
    },
    {
      freezeTableName: true
    });
  
    return Favourite;
  };