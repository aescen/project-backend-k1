const express = require('express');

const routes = express.Router();

const usersRoutes = require('./users');

routes.use('/users', usersRoutes);

routes.get('/', (req, res) => {
  const mType = req.get('Content-Type');

  if (mType === 'application/json') {
    res.json({
      title: 'ExpressJS',
      message: 'Latihan Sequelize ExpressJS',
    });
    return;
  }

  res.render('index', {
    title: 'ExpressJS',
    message: 'Latihan Sequelize ExpressJS',
  });
});

module.exports = routes;
