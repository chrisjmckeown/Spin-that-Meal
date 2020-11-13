module.exports = function (sequelize, DataTypes) {
  var ShoppingList = sequelize.define("ShoppingList", {
    ingredient_id: {
      type: DataTypes.INTEGER
    },
    type_id: {
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
  });

  return ShoppingList;
};