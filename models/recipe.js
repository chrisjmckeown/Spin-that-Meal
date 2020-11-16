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
        },
        creator_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "User",
                key: "id"
            }
        }
    },
        {
            freezeTableName: true
        });

    Recipe.associate = function (models) {
        //associate Recipe with User through Favorite table
        Recipe.belongsToMany(models.User, {
            through: "Favourite",
            foreignKey: "recipe_id"
        });
    };

    Recipe.associate = function (models) {
        //associate Recipe with creator
        Recipe.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    Recipe.associate = function (models) {
        //associate Recipe with Category throuth RecipeCategory table
        //each categories belongs to the recipe are displayed in the object
        Recipe.belongsToMany(models.Category, {
            through: "RecipeCategory",
            as: "categories",
            foreignKey: "recipe_id" 
        });
    };

    Recipe.associate = function (models) {
        //associate Recipe with ingredients throuth RecipeIngredient table
        //each ingredients belongs to the recipe are displayed in the object
        Recipe.belongsToMany(models.Ingredient, {
            through: "RecipeIngredient",
            as: "ingredients",
            foreignKey: "recipe_id" 
        });
    };
    return Recipe;
}

