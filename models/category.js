module.exports = function(sequelize, DataTypes) {
  const Category = sequelize.define("Category", {
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

    return Category;
}