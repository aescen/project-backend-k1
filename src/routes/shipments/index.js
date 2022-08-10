const express = require('express');
const { verifyJWT } = require('../common');
const { shipments } = require('../../controllers');

const shipmentsRoutes = express.Router();

shipmentsRoutes.post('/', (req, res) => {
  res.json({
    message: 'test',
  });
});
shipmentsRoutes.get('/:resi', shipments.getPengiriman);
shipmentsRoutes.put('/gudang/:resi', verifyJWT, shipments.updatePengirimanGudang);
shipmentsRoutes.put('/kurir/:resi', verifyJWT, shipments.updatePengirimanKurir);

module.exports = shipmentsRoutes;
