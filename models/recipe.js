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
        Recipe.belongsToMany(models.User, {
            through: "Favourite"
        });
        Recipe.belongsTo(models.User, {
            foreignKey: {
                allowNull: true
            }
        });
        Recipe.belongsTo(models.Category, {
            through: "Recipe_Category"
        });
        Recipe.hasMany(models.PlayList, {
            onDelete: "SET NULL"
        });
        Recipe.belongsToMany(models.RecipeIngredient, {
            through: "Recipe_Ingredient"
        });
    };
    return Recipe;
}

