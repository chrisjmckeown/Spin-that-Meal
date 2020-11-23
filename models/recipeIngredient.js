module.exports = function(sequelize, DataTypes) {
  const RecipeIngredient = sequelize.define('RecipeIngredient', {
    amount: {
      type: DataTypes.INTEGER,
    },
    RecipeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Recipe',
        key: 'id',
      },
    },
    IngredientId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Ingredient',
        key: 'id',
      },
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
