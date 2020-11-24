
module.exports = function(sequelize, DataTypes) {
  const Recipe = sequelize.define('Recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    instruction: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1],
    },
    portion: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1],
    },

  },
  {
    freezeTableName: true,
  });

  Recipe.associate = function(models) {
    Recipe.belongsTo(models.User, {
      foreignKey: {
        allowNull: true,
      },
    });
    Recipe.hasMany(models.PlayList, {
      onDelete: 'SET NULL',
    });
    Recipe.belongsToMany(models.Ingredient, {through: models.RecipeIngredient});
    Recipe.hasMany(models.RecipeIngredient);

    Recipe.belongsToMany(models.Category, {through: models.RecipeCategory});
    Recipe.hasMany(models.RecipeCategory);

    Recipe.belongsToMany(models.PlayList, {through: models.RecipePlaylist});
    Recipe.hasMany(models.RecipePlaylist);
  };
  return Recipe;
};

