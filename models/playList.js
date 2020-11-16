module.exports = function (sequelize, DataTypes) {
  var Playlist = sequelize.define("Playlist", {
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

  Playlist.associate = function (models) {
    Playlist.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Playlist.belongsTo(models.Recipe, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Playlist;
};