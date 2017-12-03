/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('resource', {
    id_resource: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    board_resource: {
      type: DataTypes.STRING,
      allowNull: false
    },
    number_resource: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status_resource: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    player_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password_resource: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'resource'
  });
};
