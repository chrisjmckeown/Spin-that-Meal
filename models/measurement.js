module.exports = function(sequelize, DataTypes) {
    var Measurement = sequelize.define("Measurement", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1]
            }
        }
    });

    return Measurement;
}