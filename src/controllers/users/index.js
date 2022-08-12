const { Op } = require('sequelize');
const { RolesModel, UsersModel } = require('../../models');
const { BCryptPassword } = require('../../utils');

module.exports = {
  addUser: async (req, res) => {
    const { role: roleJwt } = req.jwt.decoded;

    if (roleJwt !== 'super') {
      res.status(403);
      res.json({
        status: 'error',
        message: 'Anda tidak memiliki hak akses.',
      });
      return;
    }

    const {
      nama, email, password, noHp, role,
    } = req.body;

    const roles = await RolesModel.findAll({
      where: {
        role: {
          [Op.ne]: 'super',
        },
      },
    });

    const userRole = roles.find((item) => item.role === role);

    if (!userRole) {
      res.status(400);
      res.json({
        status: 'error',
        message: 'Role tidak diketahui.',
      });
      return;
    }

    const userFound = await UsersModel.findOne({
      where: {
        email,
      },
      include: {
        model: RolesModel,
        required: false,
      },
    });

    if (userFound !== null) {
      res.status(400);
      res.json({
        status: 'error',
        message: 'Username sudah ada.',
      });
      return;
    }

    const hashedPassword = await BCryptPassword.hash(password);
    const addedUser = await UsersModel.create({
      nama,
      email,
      password: hashedPassword,
      noHp,
      idRole: userRole.id,
    });

    res.status(201);
    res.json({
      status: 'success',
      data: {
        id: addedUser.id,
        nama: addedUser.nama,
        email: addedUser.email,
        noHp: addedUser.noHp,
        role: userRole.role,
      },
    });
  },
  getAllUsers: async (req, res) => {
    const { role } = req.jwt.decoded;

    if (role !== 'super') {
      res.status(403);
      res.json({
        status: 'error',
        message: 'Anda tidak memiliki hak akses.',
      });
      return;
    }

    const users = await UsersModel.findAll({
      where: {
        '$role.role$': {
          [Op.ne]: 'super',
        },
      },
      include: {
        model: RolesModel,
        required: false,
      },
    });
    const mappedUsers = users.map((item) => ({
      id: item.id,
      nama: item.nama,
      email: item.email,
      noHp: item.noHp,
      role: item.role.role,
    }));

    res.json(mappedUsers);
  },
  getUserById: async (req, res) => {
    const { role } = req.jwt.decoded;

    if (role !== 'super') {
      res.status(403);
      res.json({
        status: 'error',
        message: 'Anda tidak memiliki hak akses.',
      });
      return;
    }

    const { id: userId } = req.params;
    const userFound = await UsersModel.findOne({
      where: {
        id: userId,
      },
      include: {
        model: RolesModel,
        required: false,
      },
    });

    if (userFound === null) {
      res.status(404);
      res.json({
        status: 'error',
        message: 'User tidak terdaftar.',
      });
      return;
    }

    res.json(userFound);
  },
  updateUserById: async (req, res) => {
    const { role: roleJwt } = req.jwt.decoded;

    if (roleJwt !== 'super') {
      res.status(403);
      res.json({
        status: 'error',
        message: 'Anda tidak memiliki hak akses.',
      });
      return;
    }

    const { id: userId } = req.params;
    const {
      nama, email, password, noHp, role,
    } = req.body;

    const roles = await RolesModel.findAll({
      where: {
        role: {
          [Op.ne]: 'super',
        },
      },
    });

    const userRole = roles.find((item) => item.role === role);

    if (!userRole) {
      res.status(400);
      res.json({
        status: 'error',
        message: 'Role tidak diketahui.',
      });
      return;
    }

    const hashedPassword = await BCryptPassword.hash(password);

    const updatedUserRow = await UsersModel.update(
      {
        nama,
        email,
        password: hashedPassword,
        noHp,
        idRole: userRole.id,
      },
      {
        where: {
          id: userId,
        },
        include: {
          model: RolesModel,
          required: false,
        },
      },
    );

    if (updatedUserRow[0] === 0) {
      res.status(404);
      res.json({
        status: 'error',
        message: 'User tidak terdaftar.',
      });
      return;
    }

    res.json({
      status: 'success',
      message: 'Berhasil merubah data user.',
    });
  },
  deleteUserById: async (req, res) => {
    const { role } = req.jwt.decoded;

    if (role !== 'super') {
      res.status(403);
      res.json({
        status: 'error',
        message: 'Anda tidak memiliki hak akses.',
      });
      return;
    }

    const { id: userId } = req.params;
    const deletedUserRow = await UsersModel.destroy({
      where: {
        id: userId,
      },
    });

    if (!deletedUserRow) {
      res.status(404);
      res.json({
        status: 'error',
        message: 'User tidak terdaftar.',
      });
      return;
    }

    res.json({
      status: 'success',
      message: 'Berhasil menghapus user.',
    });
  },
};
