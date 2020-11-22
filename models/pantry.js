module.exports = function(sequelize, DataTypes) {
  const Pantry = sequelize.define('Pantry', {
    amount: {
      type: DataTypes.INTEGER,
    },
  }, {
    freezeTableName: true,
  });

  Pantry.associate = function(models) {
    // associate Pantry with user
    Pantry.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Pantry;
};
