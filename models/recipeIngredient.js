module.exports = function (sequelize, DataTypes) {
  const RecipeIngredient = sequelize.define("RecipeIngredient", {
    recipe_id: {
      type: DataTypes.INTEGER
    },
    ingredient_id: {
      type: DataTypes.INTEGER
    },
    amount: {
      type: DataTypes.INTEGER
    }
  },
    {
      freezeTableName: true
    });
  RecipeIngredient.associate = function (models) {
    RecipeIngredient.belongsTo(models.Measurement, {
      foreignKey: {
        allowNull: true
      }
    });
    RecipeIngredient.belongsTo(models.Ingredient, {
      foreignKey: {
        allowNull: true
      }
    });
  };
  return RecipeIngredient;
};
