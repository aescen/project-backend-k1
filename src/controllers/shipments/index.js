const { Op, Sequelize } = require('sequelize');
const {
  PesananModel,
  PengirimanModel,
  GudangModel,
  UsersModel,
  KodeKotaModel,
  RolesModel,
} = require('../../models');

module.exports = {
  // add pengiriman
  addPengirimanBarang: async (req, res) => {
    const { id: idJwt, role: roleJwt } = req.jwt.decoded;

    if (roleJwt === 'kurir') {
      res.status(403);
      res.json({
        status: 'error',
        message: 'Anda tidak memiliki hak akses.',
      });
      return;
    }

    const { resi, namaGudang, keterangan } = req.body;

    if (!resi || !namaGudang || !keterangan) {
      res.status(400);
      res.json({
        status: 'error',
        message: 'Data tidak lengkap.',
      });
      return;
    }

    const pesanan = await PesananModel.findOne({
      where: {
        resi: resi || null,
      },
    });

    if (pesanan === null) {
      res.status(404);
      res.json({
        status: 'error',
        message: 'Pesanan tidak ditemukan.',
      });
      return;
    }

    const gudang = await GudangModel.findOne({
      where: {
        nama: namaGudang || null,
      },
      include: [
        {
          model: UsersModel,
          required: false,
          include: {
            model: RolesModel,
            required: false,
          },
        },
        {
          model: KodeKotaModel,
          required: false,
        },
      ],
    });

    if (!gudang) {
      res.status(404);
      res.json({
        status: 'error',
        message: 'Gudang tidak ditemukan.',
      });
      return;
    }

    const idAdminGudang = gudang.user.id;

    if (idAdminGudang !== idJwt) {
      res.status(403);
      res.json({
        status: 'error',
        message: 'Anda tidak berhak mengakses gudang ini.',
      });
      return;
    }

    const idPesanan = resi.split('-')[2];
    const idGudang = gudang.id;

    await PengirimanModel.create({
      idPesanan,
      idGudang,
      keterangan,
      waktu: Sequelize.literal('NOW()'),
    });

    const pengiriman = await PengirimanModel.findOne({
      include: PesananModel,
      where: {
        '$pesanan.resi$': { [Op.eq]: resi || null },
      },
    });

    const mappedPengiriman = {
      keterangan: pengiriman.keterangan,
      waktu: pengiriman.waktu,
    };

    res.status(201);
    res.json({
      status: 'success',
      data: {
        resi,
        pengiriman: mappedPengiriman,
      },
    });
  },
  // get pengiriman by resi
  getPengirimanByResi: async (req, res) => {
    const { resi } = req.params;

    const pesanan = await PengirimanModel.findAll({
      include: PesananModel,
      where: {
        '$pesanan.resi$': { [Op.eq]: resi || null },
      },
    });

    const pengiriman = pesanan.map((item) => ({
      keterangan: item.keterangan,
      waktu: item.waktu,
    }));

    res.status(200);
    res.json({
      status: 'success',
      data: {
        resi,
        lokasi: pengiriman,
      },
    });
  },
  // Update pengiriman as admin
  updatePengirimanGudang: async (req, res) => {
    const { id: idJwt, role: roleJwt } = req.jwt.decoded;

    if (roleJwt === 'kurir') {
      res.status(403);
      res.json({
        status: 'error',
        message: 'Anda tidak memiliki hak akses.',
      });
      return;
    }

    const { resi } = req.params;
    const { namaGudang, keterangan } = req.body;

    if (!namaGudang || !keterangan) {
      res.status(400);
      res.json({
        status: 'error',
        message: 'Data tidak lengkap.',
      });
      return;
    }

    const pesanan = await PesananModel.findOne({
      where: {
        resi: resi || null,
      },
    });

    if (pesanan === null) {
      res.status(404);
      res.json({
        status: 'error',
        message: 'Pesanan tidak ditemukan.',
      });
      return;
    }

    const gudang = await GudangModel.findOne({
      where: {
        nama: namaGudang || null,
      },
      include: [
        {
          model: UsersModel,
          required: false,
          include: {
            model: RolesModel,
            required: false,
          },
        },
        {
          model: KodeKotaModel,
          required: false,
        },
      ],
    });

    if (!gudang) {
      res.status(404);
      res.json({
        status: 'error',
        message: 'Gudang tidak ditemukan.',
      });
      return;
    }

    const idAdminGudang = gudang.user.id;

    if (idAdminGudang !== idJwt) {
      res.status(403);
      res.json({
        status: 'error',
        message: 'Anda tidak berhak mengakses gudang ini.',
      });
      return;
    }

    const idPesanan = resi.split('-')[2];
    const idGudang = gudang.id;

    await PengirimanModel.create({
      idPesanan,
      idGudang,
      keterangan,
      waktu: Sequelize.literal('NOW()'),
    });

    const newPengiriman = await PengirimanModel.findAll({
      include: PesananModel,
      where: {
        '$pesanan.resi$': { [Op.eq]: resi || null },
      },
    });

    const mappedPengiriman = newPengiriman.map((item) => ({
      keterangan: item.keterangan,
      waktu: item.waktu,
    }));

    res.status(200);
    res.json({
      status: 'success',
      data: {
        resi,
        gudang: mappedPengiriman,
      },
    });
  },
  // updatePengiriman as kurir
  updatePengirimanKurir: async (req, res) => {
    const { id: idJwt, role: roleJwt } = req.jwt.decoded;
    const { resi } = req.params;
    const { keterangan } = req.body;

    if (!keterangan) {
      res.status(400);
      res.json({
        status: 'error',
        message: 'Data tidak lengkap.',
      });
      return;
    }

    const userFound = await UsersModel.findOne({
      where: {
        id: idJwt || null,
      },
      include: {
        model: RolesModel,
        required: false,
        where: {
          role: roleJwt || null,
        },
      },
    });

    const pesanan = await PengirimanModel.findOne({
      include: PesananModel,
      where: {
        '$pesanan.resi$': { [Op.eq]: resi || null },
      },
      order: [['waktu', 'DESC']],
    });

    if (pesanan === null) {
      res.status(404);
      res.json({
        status: 'error',
        message: 'Pesanan tidak ditemukan.',
      });
      return;
    }

    const { idPesanan, idGudang } = pesanan;
    const idKurir = userFound !== null ? userFound.id : null;
    const waktu = new Date().toISOString();

    await PengirimanModel.create({
      idPesanan,
      idGudang,
      keterangan,
      waktu: Sequelize.literal('NOW()'),
      idKurir,
    });

    res.status(200);
    res.json({
      status: 'success',
      data: {
        resi,
        keterangan,
        waktu,
      },
    });
  },
};
