module.exports = function(sequelize, DataTypes) {
  const Measurement = sequelize.define("Measurement", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1]
            }
        }
    },
    {
      freezeTableName: true
    });

    return Measurement;
}