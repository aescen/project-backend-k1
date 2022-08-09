const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/dbConnection');

const UsersModel = sequelize.define(
  'users',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthDate: DataTypes.DATEONLY,
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
  },
);

module.exports = UsersModel;
