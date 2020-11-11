module.exports = function (sequelize, DataTypes) {
  var RecipeIngredient = sequelize.define("RecipeIngredient", {
    recipe_id: {
      type: DataTypes.INTEGER,
    },
    ingredient_id: {
      type: DataTypes.INTEGER,
    },
    amount: {
      type: DataTypes.INTEGER,
    },
    measurement: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  return RecipeIngredient;
};
