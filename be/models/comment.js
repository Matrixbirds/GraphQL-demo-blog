'use strict';
module.exports = function(sequelize, DataTypes) {
  const Comment = sequelize.define('comment', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    article_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    comment_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
          Comment.belongsTo(models.User, { foreignKey: 'user_id' });
          Comment.belongsTo(models.Article, { foreignKey: 'article_id' });
          Comment.hasMany(models.Comment, { foreignKey: 'comment_id', as: 'Reply' });
      }
    },
    underscored: true
  });
  return Comment;
};
