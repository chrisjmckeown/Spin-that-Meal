module.exports = function(sequelize, DataTypes) {
  const Ingredient = sequelize.define('Ingredient', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
  },
  {
    freezeTableName: true,
  });
  Ingredient.associate = function(models) {
    Ingredient.belongsTo(models.Type, {
      foreignKey: {
        allowNull: true,
      },
    });
    Ingredient.belongsToMany(models.Recipe, {through: models.RecipeIngredient});
    Ingredient.hasMany(models.RecipeIngredient);
  };
  return Ingredient;
};
