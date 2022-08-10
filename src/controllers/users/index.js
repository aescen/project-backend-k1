const { UsersModel } = require('../../models');

module.exports = {
  addUser: async (req, res) => {
    const {
      username, name, email, birthDate,
    } = req.body;

    const userFound = await UsersModel.findOne({
      where: {
        username,
      },
    });

    if (userFound !== null) {
      res.status(400);
      res.json({
        message: 'Username sudah ada.',
      });
      return;
    }

    const addedUser = await UsersModel.create({
      username,
      name,
      email,
      birthDate,
    });

    res.status(201);
    res.json({
      message: 'Berhasil menambah user baru.',
    });
  },
  getAllUsers: async (req, res) => {
    const users = await UsersModel.findAll();
    res.json(users);
  },
  getUserById: async (req, res) => {
    const { id: userId } = req.params;
    const userFound = await UsersModel.findOne({
      where: {
        id: userId,
      },
    });

    if (userFound === null) {
      res.status(404);
      res.json({
        message: 'User tidak terdaftar.',
      });
      return;
    }

    res.json(userFound);
  },
  getUserByUsername: async (req, res) => {
    const { username } = req.params;
    const userFound = await UsersModel.findOne({
      where: {
        username,
      },
    });

    if (userFound === null) {
      res.status(404);
      res.json({
        message: 'User tidak terdaftar.',
      });
      return;
    }

    res.json(userFound);
  },
  updateUserById: async (req, res) => {
    const { id: userId } = req.params;
    const {
      username, name, email, birthDate,
    } = req.body;
    const updatedAt = new Date();
    const updatedUserRow = await UsersModel.update(
      {
        username,
        name,
        email,
        birthDate,
        updatedAt,
      },
      {
        where: {
          id: userId,
        },
      },
    );

    if (updatedUserRow[0] === 0) {
      res.status(404);
      res.json({
        message: 'User tidak terdaftar.',
      });
      return;
    }

    res.json({
      message: 'Berhasil merubah data user.',
    });
  },
  updateUserByUsername: async (req, res) => {
    const { username } = req.params;
    const { name, email, birthDate } = req.body;
    const updatedAt = new Date();
    const updatedUserRow = await UsersModel.update(
      {
        username,
        name,
        email,
        birthDate,
        updatedAt,
      },
      {
        where: {
          username,
        },
      },
    );

    if (updatedUserRow[0] === 0) {
      res.status(404);
      res.json({
        message: 'User tidak terdaftar.',
      });
      return;
    }

    res.json({
      message: 'Berhasil merubah data user.',
    });

    res.json(updatedUserRow);
  },
  deleteUserById: async (req, res) => {
    const { id: userId } = req.params;
    const deletedUserRow = await UsersModel.destroy({
      where: {
        id: userId,
      },
    });

    if (!deletedUserRow) {
      res.status(404);
      res.json({
        message: 'User tidak terdaftar.',
      });
      return;
    }

    res.json({
      message: 'Berhasil menghapus user.',
    });
  },
  deleteUserByUsername: async (req, res) => {
    const { username } = req.params;
    const deletedUserRow = await UsersModel.destroy({
      where: {
        username,
      },
    });

    if (!deletedUserRow) {
      res.status(404);
      res.json({
        message: 'User tidak terdaftar.',
      });
      return;
    }

    res.json({
      message: 'Berhasil menghapus user.',
    });
  },
};
