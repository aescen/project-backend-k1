const { DataTypes } = require('sequelize');
const sequelize = require('../../config/dbConnection');
const RolesModel = require('../roles');

const UsersModel = sequelize.define(
  'users',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    nama: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    noHp: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    idRole: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: RolesModel,
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
    indexes: [
      {
        unique: true,
        fields: ['email'],
      },
    ],
  },
);

RolesModel.hasMany(UsersModel, { foreignKey: 'id' });
UsersModel.belongsTo(RolesModel, { foreignKey: 'idRole' });

module.exports = UsersModel;
