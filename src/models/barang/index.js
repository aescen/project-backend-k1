const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/dbConnection');
const UsersModel = require('../users');

const BarangModel = sequelize.define(
  'barang',
  {
    id: {
      type: DataTypes.STRING(64),
      primaryKey: true,
    },
    idAdmin: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: UsersModel,
        key: 'id',
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    },
    resi: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    namaBarang: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    namaPengirim: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    namaPenerima: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    alamatPengirim: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alamatPenerima: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    noHpPengirim: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    noHpPenerima: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    berat: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    ongkir: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('NOW()'),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('NOW()'),
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['resi'],
      },
    ],
  },
);

UsersModel.hasMany(BarangModel, { foreignKey: 'id' });
BarangModel.belongsTo(UsersModel, { foreignKey: 'idAdmin' });

module.exports = BarangModel;
