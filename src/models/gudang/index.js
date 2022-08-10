const { DataTypes } = require('sequelize');
const sequelize = require('../../config/dbConnection');
const UsersModel = require('../users');
const KodeKotaModel = require('../kodekota');

const GudangModel = sequelize.define(
  'gudang',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    idAdmin: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: UsersModel,
        key: 'id',
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    },
    nama: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    alamat: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    idKodeKota: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: KodeKotaModel,
        key: 'id',
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    underscored: true,
  },
);

UsersModel.hasMany(GudangModel, { foreignKey: 'id' });
GudangModel.belongsTo(UsersModel, { foreignKey: 'idAdmin' });

KodeKotaModel.hasMany(GudangModel, { foreignKey: 'id' });
GudangModel.belongsTo(KodeKotaModel, { foreignKey: 'idKodeKota' });

module.exports = GudangModel;
