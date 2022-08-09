const { DataTypes } = require('sequelize');
const sequelize = require('../../config/dbConnection');

const RolesModel = sequelize.define(
  'roles',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    underscored: true,
  },
);

module.exports = RolesModel;
