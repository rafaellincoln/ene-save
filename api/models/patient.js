/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const Patient = sequelize.define('patient', {
    id_patient: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name_patient: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bith_year: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    blood_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true
    },
    allergy: {
      type: DataTypes.JSONB,
      allowNull: true
    }
  }, {
    tableName: 'patient'
  });

  Patient.associate = models => {
    Patient.belongsToMany(models.occurrence, {
      foreignKey: 'id_patient',
      sourceKey: 'id_patient',
      otherKey: 'id_occurrence',
      as: 'oc',
      required: true,
      through: {
        model: models.occurrence_patient,
        required: true,
        unique: false,
      }
    })
  }

  return Patient;
};
