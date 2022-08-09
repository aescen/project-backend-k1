const { DataTypes } = require('sequelize');
const sequelize = require('../../config/dbConnection');

const KodeKotaModel = sequelize.define(
  'kode_kota',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    kode: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true,
    },
    nama: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    underscored: true,
  },
);

module.exports = KodeKotaModel;
