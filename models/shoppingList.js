module.exports = function (sequelize, DataTypes) {
  const ShoppingList = sequelize.define("ShoppingList", {
    ingredient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Ingredient",
        key: "id"
      }
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Type",
        key: "id"
      }
    },
    amount: {
      type: DataTypes.INTEGER
    },
    measurement_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Measurement",
        key: "id"
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id"
      }
    }
  },
    {
      freezeTableName: true
    });

  ShoppingList.associate = function (models) {
    //associate ShoppingList with User
    ShoppingList.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return ShoppingList;
};
