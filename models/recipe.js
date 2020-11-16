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
        category_id: {
            type: DataTypes.INTEGER
        }
    },
        {
            freezeTableName: true
        });

    Recipe.associate = function (models) {
        // Recipe should belong to an User
        Recipe.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
        User.hasMany(models.Playlist, {
          onDelete: "cascade"
        });
    };
    return Recipe;
}