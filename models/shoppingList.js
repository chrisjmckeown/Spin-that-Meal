module.exports = function (sequelize, DataTypes) {
  const ShoppingList = sequelize.define("ShoppingList", {
      ingredient_id: {
        type: DataTypes.INTEGER
      },
      amount: {
        type: DataTypes.INTEGER
      },
      measurement_id: {
        type: DataTypes.INTEGER
      },
      user_id: {
        type: DataTypes.INTEGER 
      }
    },
    {
      freezeTableName: true
    });
    return ShoppingList;
  };