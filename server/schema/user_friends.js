/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_friends', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false
    },
    user_friends_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false
    },
    user_note: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    user_status: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'user_friends'
  });
};
