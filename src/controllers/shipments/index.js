const { Op, Sequelize } = require('sequelize');
const {
  BarangModel,
  PengirimanModel,
  GudangModel,
  UsersModel,
  KodeKotaModel,
  RolesModel,
} = require('../../models');

module.exports = {
  getPengiriman: async (req, res) => {
    const { resi } = req.params;

    const pesanan = await PengirimanModel.findAll({
      include: BarangModel,
      where: {
        '$barang.resi$': { [Op.eq]: resi },
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
    const { namaGudang: paramNamaGudang, keterangan } = req.body;

    const gudang = await GudangModel.findOne({
      where: {
        nama: paramNamaGudang,
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

    const idAdminGudang = gudang.user.id;
    const namaGudang = gudang.nama;

    if (paramNamaGudang !== namaGudang) {
      res.status(400);
      res.json({
        status: 'error',
        message: 'Nama gudang tidak sesuai.',
      });
      return;
    }

    if (idAdminGudang !== idJwt) {
      res.status(403);
      res.json({
        status: 'error',
        message: 'Anda tidak berhak mengakses gudang ini.',
      });
      return;
    }

    const idBarang = resi.split('-')[2];
    const idGudang = gudang.id;

    await PengirimanModel.create({
      idBarang,
      idGudang,
      keterangan,
      waktu: Sequelize.literal('NOW()'),
    });

    const newPengiriman = await PengirimanModel.findAll({
      include: BarangModel,
      where: {
        '$barang.resi$': { [Op.eq]: resi },
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

  /* putPengirimanKurir: async (req, res) => {
    const { resi } = req.params;

    const updatePengiriman = await PengirimanModel.update(
      {
        statusPengiriman,
      },
      {
        where: {
          '$barang.resi$': { [Op.eq]: resi },
        },
      },
    );
    const status = updatePengiriman.map((item) => ({
      keterangan: item.keterangan,
    }));
    res.status(200);
    res.json({
      status: 'success',
      data: {
        resi,
        statusPengiriman: status,
      },
    });
  }, */
};
