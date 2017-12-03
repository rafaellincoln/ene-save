/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const Occurrence = sequelize.define('occurrence', {
    id_occurrence: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_resource: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'resource',
        key: 'id_resource'
      }
    },
    name_solicitant: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    number_address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    complement: {
      type: DataTypes.STRING,
      allowNull: true
    },
    neighborhood: {
      type: DataTypes.STRING,
      allowNull: true
    },
    reference_address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    emergency: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    location: {
      type: DataTypes.JSONB,
      allowNull: false,
    }
  }, {
    tableName: 'occurrence'
  });

  Occurrence.associate = models => {
    Occurrence.belongsToMany(models.patient, {
      foreignKey: 'id_occurrence',
      sourceKey: 'id_occurrence',
      otherKey: 'id_patient',
      as: 'p',
      required: true,
      through: {
        model: models.occurrence_patient,
        required: true,
        unique: false,
      }
    })

    // Category.hasOne(models.sva, {
    //   foreignKey: 'id_principal_category',
    //   as: 'principal_sva',
    // });
  }

  return Occurrence;
};
