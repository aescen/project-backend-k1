const express = require('express');
const { users } = require('../../controllers');
const { verifyJWT } = require('../common');

const usersRoutes = express.Router();

usersRoutes.post('/', verifyJWT, users.addUser);
usersRoutes.get('/', verifyJWT, users.getAllUsers);
usersRoutes.get('/:id', verifyJWT, users.getUserById);
usersRoutes.put('/:id', verifyJWT, users.updateUserById);
usersRoutes.delete('/:id', verifyJWT, users.deleteUserById);

module.exports = usersRoutes;
