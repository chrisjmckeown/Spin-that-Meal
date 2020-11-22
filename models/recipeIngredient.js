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
    RecipeIngredient.belongsTo(models.Measurement, {
      foreignKey: {
        allowNull: true,
      },
    });
    RecipeIngredient.belongsTo(models.Ingredient, {
      foreignKey: {
        allowNull: true,
      },
    });
    RecipeIngredient.belongsTo(models.Recipe, {
      foreignKey: {
        allowNull: true,
      },
    });
  };
  return RecipeIngredient;
};
