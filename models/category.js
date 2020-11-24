module.exports = function(sequelize, DataTypes) {
  const Category = sequelize.define('Category', {
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
    timestamps: false,
  });
  Category.associate = function(models) {
    Category.belongsToMany(models.Recipe, {through: models.RecipeCategory});
    Category.hasMany(models.RecipeCategory);
  };
  return Category;
};
