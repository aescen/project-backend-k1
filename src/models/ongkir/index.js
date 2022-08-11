const { DataTypes } = require('sequelize');
const sequelize = require('../../config/dbConnection');
const KodeKotaModel = require('../kodekota');

const OngkirModel = sequelize.define(
  'ongkir',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    kotaPengirim: {
      type: DataTypes.STRING(64),
      allowNull: false,
      references: {
        model: KodeKotaModel,
        key: 'kode',
      },
    },
    kotaPenerima: {
      type: DataTypes.STRING(64),
      allowNull: false,
      references: {
        model: KodeKotaModel,
        key: 'kode',
      },
    },
    ongkir: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    underscored: true,
  },
);

KodeKotaModel.hasMany(OngkirModel, { foreignKey: 'kode' });
OngkirModel.belongsTo(KodeKotaModel, { foreignKey: 'kotaPengirim' });

KodeKotaModel.hasMany(OngkirModel, { foreignKey: 'kode' });
OngkirModel.belongsTo(KodeKotaModel, { foreignKey: 'kotaPenerima' });

module.exports = OngkirModel;
