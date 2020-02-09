/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('label', {
    label_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    label_name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    label_description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'label'
  });
};
