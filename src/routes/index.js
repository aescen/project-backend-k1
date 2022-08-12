const express = require('express');

const routes = express.Router();

const usersRoutes = require('./users');
const loginRoutes = require('./login');
const ordersRoutes = require('./orders');
const shipmentsRoutes = require('./shipments');

routes.use('/users', usersRoutes);
routes.use('/login', loginRoutes);
routes.use('/orders', ordersRoutes);
routes.use('/shipments', shipmentsRoutes);

routes.get('/', (req, res) => {
  const mType = req.get('Content-Type');

  if (mType === 'application/json') {
    res.json({
      status: 'success',
      title: 'AIA Kargo Express',
      message: 'AIA Kargo Express',
    });
    return;
  }

  res.render('index', {
    title: 'AIA Kargo Express',
    message: 'AIA Kargo Express',
  });
});

module.exports = routes;
