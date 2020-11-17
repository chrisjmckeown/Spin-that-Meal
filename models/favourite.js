module.exports = function (sequelize, DataTypes) {
  const Favourite = sequelize.define("Favourite", {
  },{
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