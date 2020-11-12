module.exports = function (sequelize, DataTypes) {
  var RecipeIngredient = sequelize.define("RecipeIngredient", {
    recipe_id: {
      type: DataTypes.INTEGER
    },
    ingredient_id: {
      type: DataTypes.INTEGER
    },
    amount: {
      type: DataTypes.INTEGER
    },
    measurement_id: {
      type: DataTypes.INTEGER
    }
  });

  return RecipeIngredient;
};
