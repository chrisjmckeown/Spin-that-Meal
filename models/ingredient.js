module.exports = function(sequelize, DataTypes) {
    var Ingredient = sequelize.define("Ingredient", {
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
    });

    return Ingredient;
}