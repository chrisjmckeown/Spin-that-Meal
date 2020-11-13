module.exports = function(sequelize, DataTypes) {
    const Type = sequelize.define("Type", {
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
    return Type;
}