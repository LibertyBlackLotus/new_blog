/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('category', {
    cate_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    cate_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    cate_description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    partent_cate_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false
    }
  }, {
    tableName: 'category'
  });
};
