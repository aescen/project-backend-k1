const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dialect: 'mysql',
  host: process.env.DB_HOST || '0.0.0.0',
  port: process.env.DB_PORT || '3306',
});

module.exports = sequelize;
