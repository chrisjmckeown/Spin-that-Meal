module.exports = function (sequelize, DataTypes) {
  const RecipeIngredient = sequelize.define("RecipeIngredient", {
    recipe_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Recipe",
        key: "id"
      }
    },
    ingredient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Ingredient",
        key: "id"
      }
    },
    amount: {
      type: DataTypes.INTEGER
    },
    measurement_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Measurement",
        key: "id"
      }
    }
  },
  {
    freezeTableName: true
  });
  return RecipeIngredient;
};
