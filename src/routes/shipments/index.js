const express = require('express');
const { verifyJWT } = require('../common');
const { shipments } = require('../../controllers');

const shipmentsRoutes = express.Router();

shipmentsRoutes.post('/', verifyJWT, shipments.addPengirimanBarang);
shipmentsRoutes.get('/:resi', shipments.getPengirimanByResi);
shipmentsRoutes.put('/gudang/:resi', verifyJWT, shipments.updatePengirimanGudang);
shipmentsRoutes.put('/kurir/:resi', verifyJWT, shipments.updatePengirimanKurir);

module.exports = shipmentsRoutes;
