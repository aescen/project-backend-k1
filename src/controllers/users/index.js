const { UsersModel } = require('../../models');

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const users = await UsersModel.find({});

      res.json(users);
    } catch (error) {
      console.log(error);
      res.status(500);
      res.json({
        message: 'Terjadi kesalahan pada server kami.',
      });
    }
  },
};
