module.exports = function (sequelize, DataTypes) {
  const Pantry = sequelize.define("Pantry", {
    ingredient_id: {
<<<<<<< HEAD
      type: DataTypes.INTEGER
    },
    type_id: {
      type: DataTypes.INTEGER
=======
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
>>>>>>> main
    },
    amount: {
      type: DataTypes.INTEGER
    },
    measurement_id: {
<<<<<<< HEAD
      type: DataTypes.INTEGER
    },
    user_id: {
      type: DataTypes.INTEGER
    }
  });

=======
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
  });

  Pantry.associate = function(models) {
    //associate Pantry with user
    Pantry.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

>>>>>>> main
  return Pantry;
};