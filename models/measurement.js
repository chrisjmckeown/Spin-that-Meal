module.exports = function(sequelize, DataTypes) {
    var Measurement = sequelize.define("Measurement", {
        unit: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1]
            }
        }
    });

    return Measurement;
}