module.exports = function (sequelize, DataTypes) {
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

  Type.associate = function (models) {
    //associate Type with Ingredient
    Type.hasMany(models.Ingredient, {
      foreignKey: "type_id"
    });
  }
  return Type;
}