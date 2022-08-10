const express = require('express');

const shipmentsRoutes = express.Router();
const { shipments } = require('../../controllers');

shipmentsRoutes.post('/', (req, res) => {
  res.json({
    message: 'test',
  });
});
shipmentsRoutes.get('/:resi', shipments.getPengiriman);
shipmentsRoutes.put('/:id', (req, res) => {
  res.json({
    message: 'test put',
  });
});

module.exports = shipmentsRoutes;
