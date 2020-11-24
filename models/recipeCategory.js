module.exports = function(sequelize, DataTypes) {
  const RecipeCategory = sequelize.define('RecipeCategory', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
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
