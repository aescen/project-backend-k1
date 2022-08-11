const express = require('express');
const { verifyJWT } = require('../common');
const { orders } = require('../../controllers');

const ordersRoutes = express.Router();

ordersRoutes.post('/', verifyJWT, orders.addPesanan);
ordersRoutes.get('/', verifyJWT, orders.getAllPesanan);
ordersRoutes.get('/:resi', verifyJWT, orders.getPesananByResi);
ordersRoutes.put('/:resi', verifyJWT, orders.updatePesananByResi);
ordersRoutes.delete('/:resi', verifyJWT, orders.deletePesananByResi);

module.exports = ordersRoutes;
