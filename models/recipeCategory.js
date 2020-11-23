module.exports = function(sequelize, DataTypes) {
  const RecipeCategory = sequelize.define('RecipeCategory', {
    RecipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Recipe',
        key: 'id',
      },
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Category',
        key: 'id',
      },
    },
  },
  {
    freezeTableName: true,
  });

  return RecipeCategory;
};
