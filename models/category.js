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
  });
  Category.associate = function(models) {
    Category.belongsToMany(models.Recipe, {
      through: 'Recipe_Category',
    });
  };
  return Category;
};
