module.exports = function (sequelize, DataTypes) {
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
        }
    },
        {
            freezeTableName: true
        });

    Recipe.associate = function (models) {
        Recipe.belongsTo(models.User, {
            foreignKey: {
                allowNull: true
            }
        });
        Recipe.belongsTo(models.Category, {
            foreignKey: {
                allowNull: true
            }
        });
        Recipe.hasMany(models.PlayList, {
            onDelete: "SET NULL"
        });
        Recipe.hasMany(models.RecipeIngredient, {
          onDelete: "SET NULL"
        });
    };
    return Recipe;
}