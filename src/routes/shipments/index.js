const express = require('express');

const shipmentsRoutes = express.Router();

shipmentsRoutes.post('/', (req, res) => {
  res.json({
    message: 'test',
  });
});
shipmentsRoutes.get('/', (req, res) => {
  res.json({
    message: 'test get',
  });
});
shipmentsRoutes.put('/:id', (req, res) => {
  res.json({
    message: 'test put',
  });
});

module.exports = shipmentsRoutes;
