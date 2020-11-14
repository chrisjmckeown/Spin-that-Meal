module.exports = function(sequelize, DataTypes) {
  const Ingredient = sequelize.define("Ingredient", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1]
            }
        },
        type_id: {
            type: DataTypes.INTEGER
        }
    },
    {
      freezeTableName: true
    });
    return Ingredient;
}