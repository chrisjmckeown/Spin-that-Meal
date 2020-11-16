module.exports = function (sequelize, DataTypes) {
  var PlayList = sequelize.define("PlayList", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  },
    {
      freezeTableName: true
    });

    PlayList.associate = function (models) {
      PlayList.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    PlayList.belongsTo(models.Recipe, {
      foreignKey: {
        allowNull: true
      }
    });
  };
  return PlayList;
};