// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
const bcrypt = require("bcryptjs");

module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define("User", {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [1]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [1],
                isEmail: true
            }
        },
        // The password cannot be null
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
    },
        {
            freezeTableName: true
        });
    // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };
    // Hooks are automatic methods that run during various phases of the User Model lifecycle
    // In this case, before a User is created, we will automatically hash their password
    User.addHook("beforeCreate", user => {
        user.password = bcrypt.hashSync(
            user.password,
            bcrypt.genSaltSync(10),
            null
        );
    });

    User.associate = function (models) {
        // Associating User with Post
        // When an User is deleted, also delete any associated Post
        User.hasMany(models.Post, {
            onDelete: "cascade"
        });
    };

    User.associate = function (models) {
        // associating User with Recipe liked through Favouite table
        User.belongsToMany(models.Recipe, {
            through: "Favourite",
            foreignKey: "user_id"
        });
    };

    User.associate = function (models) {
        // Associating User with Pantry
        // When an User is deleted, also delete any associated Pantry items
        User.hasMany(models.Pantry, {
            foreignKey: "user_id",
            onDelete: "cascade"
        });
    };

    User.associate = function (models) {
        // Associating User with Recipe created
        user.hasMany(models.Recipe, {
            foreignKey: "creator_id",
        });
    };

    User.associate = function (models) {
        // Associating User with ShoppingList
        // When an User is deleted, also delete any associated ShoppingList items
        User.hasMany(models.ShoppingList, {
            foreignKey: "user_id",
            onDelete: "cascade"
        });
    };
    return User;
};