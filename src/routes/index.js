const express = require('express');
const usersRoutes = require('./users');

const routes = express.Router();

routes.use('/users', usersRoutes);

routes.get('/', (req, res) => {
  res.json('Home');
});

module.exports = routes;
