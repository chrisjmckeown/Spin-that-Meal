module.exports = function(sequelize, DataTypes) {
  const RecipeCategory = sequelize.define('RecipeCategory', {
  },
  {
    freezeTableName: true,
  });
  RecipeCategory.associate = function(models) {
    RecipeCategory.belongsTo(models.Recipe);
    RecipeCategory.belongsTo(models.Category);
  };
  return RecipeCategory;
};
