module.exports = function(sequelize, DataTypes) {
  const PlayList = sequelize.define('PlayList', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
  },
  {
    freezeTableName: true,
  });

  PlayList.associate = function(models) {
    PlayList.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
    PlayList.belongsTo(models.Recipe, {
      foreignKey: {
        allowNull: true,
      },
    });


    PlayList.belongsToMany(models.Recipe, {through: models.RecipePlaylist});
    PlayList.hasMany(models.RecipePlaylist);
  };
  return PlayList;
};
