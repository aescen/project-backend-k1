const { TokenManager } = require('../utils');

const verifyJWT = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(400);
    res.json({
      status: 'error',
      message: 'Gagal memuat data. Token tidak ada',
    });
    return;
  }

  const decoded = TokenManager.verifyAccessToken(authorization);

  if (decoded) {
    req.jwt = {
      decoded,
    };
    next();
    return;
  }

  res.status(401);
  res.json({
    status: 'error',
    message: 'Gagal memuat data. Token anda tidak valid.',
  });
};

module.exports = { verifyJWT };
