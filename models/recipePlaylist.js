module.exports = function(sequelize, DataTypes) {
  const RecipePlaylist = sequelize.define('RecipePlaylist', {
  },
  {
    freezeTableName: true,
  });
  RecipePlaylist.associate = function(models) {
    RecipePlaylist.belongsTo(models.Recipe);
    RecipePlaylist.belongsTo(models.PlayList);
  };
  return RecipePlaylist;
};
