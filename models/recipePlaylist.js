module.exports = function(sequelize, DataTypes) {
  const RecipePlaylist = sequelize.define('RecipePlaylist', {
    RecipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Recipe',
        key: 'id',
      },
    },
    PlayListId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'PlayList',
        key: 'id',
      },
    },
  },
  {
    freezeTableName: true,
  });
  return RecipePlaylist;
};
