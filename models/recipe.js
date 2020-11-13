module.exports = function(sequelize, DataTypes) {
    const Recipe = sequelize.define("Recipe", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        instruction: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        },
        portion: {
            type: DataTypes.INTEGER
        },
        user_id: {
            type: DataTypes.INTEGER
        },
        category_id: {
            type: DataTypes.INTEGER
        }
    },
    {
      freezeTableName: true
    });
    return Recipe;
}