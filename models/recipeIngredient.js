module.exports = function(sequelize, DataTypes) {
  const RecipeIngredient = sequelize.define('RecipeIngredient', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
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
