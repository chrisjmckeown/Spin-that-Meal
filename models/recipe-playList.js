module.exports = function(sequelize, DataTypes) {
  const RecipePlayList = sequelize.define('RecipePlayList', {},
      {
        freezeTableName: true,
      });

  // RecipePlayList.associate = function(models) {
  //   RecipePlayList.belongsTo(models.Playlist, {
  //     foreignKey: {
  //       allowNull: false,
  //     },
  //   });
  //   RecipePlayList.belongsTo(models.Recipe, {
  //     foreignKey: {
  //       allowNull: false,
  //     },
  //   });
  // };
  return RecipePlayList;
};
