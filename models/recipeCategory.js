module.exports = function (sequelize, DataTypes) {
    const RecipeCategory = sequelize.define("RecipeCategory", {
        recipe_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "Recipe",
            key: "id"
          }
        },
        category_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "Category" ,
            key: "id"
          }
        }
      },
      {
        freezeTableName: true
      });
    
      return RecipeCategory;
    };