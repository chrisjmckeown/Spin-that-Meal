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