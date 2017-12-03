/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('occurrence_patient', {
    id_occurrence_patient: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_patient: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'patient',
        key: 'id_patient'
      }
    },
    id_occurrence: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'occurrence',
        key: 'id_occurrence'
      }
    },
    complaint_patient: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    informations_patient: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    multimedia_communication: {
      type: DataTypes.JSONB,
      allowNull: true
    }
  }, {
    tableName: 'occurrence_patient'
  });
};
