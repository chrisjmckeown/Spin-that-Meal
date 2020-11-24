module.exports = function(sequelize, DataTypes) {
  const RecipeIngredient = sequelize.define('RecipeIngredient', {
    amount: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
  });
  RecipeIngredient.associate = function(models) {
    RecipeIngredient.belongsTo(models.Recipe);
    RecipeIngredient.belongsTo(models.Ingredient);
    RecipeIngredient.belongsTo(models.Measurement, {
      foreignKey: {
        allowNull: true,
      },
    });
  };
  return RecipeIngredient;
};
