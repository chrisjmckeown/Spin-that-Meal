module.exports = function (sequelize, DataTypes) {
  const Favourite = sequelize.define("Favourite", {
<<<<<<< HEAD
    user_id: {
      type: DataTypes.INTEGER
=======
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
>>>>>>> main
    },
    recipe_id: {
      type: DataTypes.INTEGER
    }
  },
    {
      freezeTableName: true
    });

  Favourite.associate = function (models) {
    Favourite.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Favourite.belongsTo(models.Recipe, {
      foreignKey: {
        allowNull: false
      }
    });
  }
  return Favourite;
};