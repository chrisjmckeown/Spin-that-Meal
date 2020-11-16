module.exports = function(sequelize, DataTypes) {
  const Category = sequelize.define("Category", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1]
            }
        }
    },
    {
      freezeTableName: true
    });

    Category.associate = function (models) {
      //associate categoty with recipe through RecipeCategory table
      Category.belongsToMany(models.Recipe, {
          through: "RecipeCategory",
          as: "recipes",
          foreignKey: "category_id" 
      });
  };

    return Category;
}