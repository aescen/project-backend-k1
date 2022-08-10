const { DataTypes } = require('sequelize');
const sequelize = require('../../config/dbConnection');
const BarangModel = require('../barang');
const GudangModel = require('../gudang');
const UsersModel = require('../users');

const PengirimanModel = sequelize.define(
  'pengiriman',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    idBarang: {
      type: DataTypes.STRING(64),
      allowNull: false,
      references: {
        model: BarangModel,
        key: 'id',
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    },
    idGudang: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: GudangModel,
        key: 'id',
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    },
    keterangan: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    waktu: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    idKurir: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: UsersModel,
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'SET NULL',
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    underscored: true,
  },
);

BarangModel.hasMany(PengirimanModel, { foreignKey: 'id' });
PengirimanModel.belongsTo(BarangModel, { foreignKey: 'idBarang' });

GudangModel.hasMany(PengirimanModel, { foreignKey: 'id' });
PengirimanModel.belongsTo(GudangModel, { foreignKey: 'idGudang' });

UsersModel.hasMany(PengirimanModel, { foreignKey: 'id' });
PengirimanModel.belongsTo(UsersModel, { foreignKey: 'idKurir' });

module.exports = PengirimanModel;
