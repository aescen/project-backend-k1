const express = require('express');
const { UsersController } = require('../../controllers');

const usersRoutes = express.Router();

usersRoutes.get('/', UsersController.getAllUsers);

module.exports = usersRoutes;
