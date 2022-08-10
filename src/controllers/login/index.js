const { RolesModel } = require('../../models');
const { UsersModel } = require('../../models');
const { TokenManager, BCryptPassword } = require('../../utils');

module.exports = {
  addLogin: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      res.json({
        status: 'error',
        message: 'Gagal login, data tidak lengkap.',
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

    console.log(await BCryptPassword.hash(password));

    const passwordMatch = await BCryptPassword.comparePassword(
      password, // password
      userFound.password, // hashedPassword
    );

    if (!userFound || !passwordMatch) {
      res.status(400);
      res.json({
        status: 'error',
        message: 'Gagal login, email atau password salah.',
      });
      return;
    }

    const accessToken = TokenManager.generateAccessToken({
      id: userFound.id,
      nama: userFound.nama,
      role: userFound.role.role,
    });

    res.json({
      accessToken,
    });
  },
};
