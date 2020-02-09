/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_name: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      defaultValue: ''
    },
    password: {
      type: DataTypes.CHAR(128),
      allowNull: false,
      defaultValue: '0'
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    photo: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    phone_number: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    },
    nickname: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: ''
    },
    register_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    tableName: 'user'
  });
};
