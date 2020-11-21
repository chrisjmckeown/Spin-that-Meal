module.exports = function (sequelize, DataTypes) {
    const Recipe_Category = sequelize.define("Recipe_Category", {
    },
      {
        freezeTableName: true
      });

    return Recipe_Category;
  }