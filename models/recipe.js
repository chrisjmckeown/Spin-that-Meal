
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
    Recipe.belongsToMany(models.User, {
      through: 'Favourite',
    });
    Recipe.belongsTo(models.User, {
      foreignKey: {
        allowNull: true,
      },
    });
    Recipe.hasMany(models.PlayList, {
      onDelete: 'SET NULL',
    });
    Recipe.belongsToMany(models.Ingredient, {
      through: 'RecipeIngredient',
    });
    Recipe.hasMany(models.Favourite, {
      onDelete: 'cascade',
    });

    Recipe.belongsToMany(models.Category, {through: models.RecipeCategory});
    Recipe.hasMany(models.RecipeCategory);

    Recipe.belongsToMany(models.PlayList, {through: models.RecipePlaylist});
    Recipe.hasMany(models.RecipePlaylist);
  };
  return Recipe;
};

