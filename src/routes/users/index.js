const express = require('express');

const usersRoutes = express.Router();
const { users } = require('../../controllers');

usersRoutes.post('/', users.addUser);
usersRoutes.get('/', users.getAllUsers);
usersRoutes.get('/:id', users.getUserById);
usersRoutes.get('/by-username/:username', users.getUserByUsername);
usersRoutes.put('/:id', users.updateUserById);
usersRoutes.put('/by-username/:username', users.updateUserByUsername);
usersRoutes.delete('/:id', users.deleteUserById);
usersRoutes.delete('/by-username/:username', users.deleteUserByUsername);

module.exports = usersRoutes;
