const { Op, Sequelize } = require('sequelize');
const { customAlphabet } = require('nanoid');
const {
  BarangModel,
  PengirimanModel,
  GudangModel,
  UsersModel,
  KodeKotaModel,
  RolesModel,
  OngkirModel,
} = require('../../models');

const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 10);

module.exports = {
  getPengiriman: async (req, res) => {
    const { resi } = req.params;

    const pesanan = await PengirimanModel.findAll({
      include: BarangModel,
      where: {
        '$barang.resi$': { [Op.eq]: resi || null },
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

    const {
      namaGudang, barang, pengirim, penerima,
    } = req.body;

    if (!namaGudang || !barang || !pengirim || !penerima) {
      res.status(400);
      res.json({
        status: 'error',
        message: 'Data tidak lengkap.',
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

    const kodeKota = await KodeKotaModel.findOne({
      where: {
        nama: {
          [Op.or]: {
            [Op.eq]: pengirim.kota.toUpperCase(),
            [Op.eq]: penerima.kota.toUpperCase(),
          },
        },
      },
    });

    const ongkirData = await OngkirModel.findOne({
      where: {
        kotaPengirim: pengirim.kota.toUpperCase(),
        kotaPenerima: penerima.kota.toUpperCase(),
      },
    });

    console.log(JSON.stringify(kodeKota));

    // const kodeKotaPengirim = kodeKota.find(
    //   (item) => item.nama === pengirim.kota.toUpperCase(),
    // );
    // const kodeKotaPenerima = kodeKota.find(
    //   (item) => item.nama === penerima.kota.toUpperCase(),
    // );

    // if (!kodeKotaPengirim || !kodeKotaPenerima || !ongkirData) {
    //   res.status(400);
    //   res.json({
    //     status: 'error',
    //     message: 'Data kota belum terdaftar di sistem.',
    //   });
    //   return;
    // }

    // const idBarang = nanoid();
    // const resi = `${kodeKotaPengirim}-${kodeKotaPenerima}-${idBarang}`.toUpperCase();
    // const { ongkir } = ongkirData;
    // const newPesanan = {
    //   id: idBarang,
    //   idAdmin: idJwt,
    //   resi,
    //   namaBarang: barang.nama,
    //   namaPengirim: pengirim.nama,
    //   namaPenerima: penerima.nama,
    //   alamatPengirim: pengirim.alamat,
    //   alamatPenerima: penerima.noHp,
    //   noHpPengirim: pengirim.noHp,
    //   noHpPenerima: penerima.noHp,
    //   berat: barang.berat,
    //   ongkir,
    //   status: 'Diproses',
    //   createdAt: Sequelize.literal('NOW()'),
    //   updatedAt: Sequelize.literal('NOW()'),
    // };

    // await BarangModel.create({ ...newPesanan });

    res.status(201);
    res.json({
      status: 'success',
      data: {
        resi,
        ongkir,
        barang,
        pengirim,
        penerima,
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
    const { namaGudang, keterangan } = req.body;

    if (!namaGudang || !keterangan) {
      res.status(400);
      res.json({
        status: 'error',
        message: 'Data tidak lengkap.',
      });
      return;
    }

    const pesanan = await BarangModel.findOne({
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
        '$barang.resi$': { [Op.eq]: resi || null },
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
      include: BarangModel,
      where: {
        '$barang.resi$': { [Op.eq]: resi || null },
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

    const { idBarang, idGudang } = pesanan;
    const idKurir = userFound !== null ? userFound.id : null;
    const waktu = new Date().toISOString();

    await PengirimanModel.create({
      idBarang,
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
