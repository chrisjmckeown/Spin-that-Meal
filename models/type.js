module.exports = function(sequelize, DataTypes) {
    var Type = sequelize.define("Type", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1]
            }
        }
    });

    return Type;
}