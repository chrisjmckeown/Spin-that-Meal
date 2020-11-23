module.exports = function(sequelize, DataTypes) {
  const Measurement = sequelize.define('Measurement', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  });
  Measurement.associate = function(models) {
    Measurement.hasMany(models.RecipeIngredient, {
      onDelete: 'SET NULL',
    });
  };

  return Measurement;
};
