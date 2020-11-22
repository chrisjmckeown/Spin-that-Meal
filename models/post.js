module.exports = function(sequelize, DataTypes) {
  const Post = sequelize.define('Post', {
    message: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
  },
  {
    freezeTableName: true,
  });

  Post.associate = function(models) {
    // Post should belong to an User
    Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Post;
};
