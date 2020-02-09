/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comments', {
    comment_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false
    },
    article_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false
    },
    comment_like_count: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    comment_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    comment_content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    parent_comment_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false
    }
  }, {
    tableName: 'comments'
  });
};
