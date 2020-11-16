module.exports = function (sequelize, DataTypes) {
  const Ingredient = sequelize.define("Ingredient", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Type",
        key: "id"
      }
    }
  },
    {
      freezeTableName: true
    });

  Ingredient.associate = function (models) {
    //associate Ingredient with Type
    Ingredient.belongsTo(models.Type, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  Ingredient.associate = function (models) {
    //associate ingredients with recipe through RecipeIngredient table
    Ingredient.belongsToMany(models.Recipe, {
        through: "RecipeIngredient",
        foreignKey: "recipe_id" 
    });
};
  return Ingredient;
}