module.exports = function (sequelize, DataTypes) {
  const Pantry = sequelize.define("Pantry", {
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

  return Pantry;
};