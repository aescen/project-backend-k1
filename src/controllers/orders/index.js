const { Op, Sequelize } = require('sequelize');
const { customAlphabet } = require('nanoid');
const {
  PesananModel,
  GudangModel,
  UsersModel,
  KodeKotaModel,
  RolesModel,
  OngkirModel,
} = require('../../models');

const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ9876543210', 12);

const PER_KILO = 5;

module.exports = {
  // Add pesanan
  addPesanan: async (req, res) => {
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
      if (roleJwt !== 'super') {
        res.status(403);
        res.json({
          status: 'error',
          message: 'Anda tidak berhak mengakses gudang ini.',
        });
        return;
      }
    }

    const kodeKota = await KodeKotaModel.findAll({
      where: {
        [Op.or]: [
          { nama: pengirim.kota.toUpperCase() },
          { nama: penerima.kota.toUpperCase() },
        ],
      },
    });

    const kodeKotaPengirim = kodeKota.find(
      (item) => item.nama === pengirim.kota.toUpperCase(),
    );
    const kodeKotaPenerima = kodeKota.find(
      (item) => item.nama === penerima.kota.toUpperCase(),
    );

    const ongkirData = await OngkirModel.findOne({
      where: [
        { kota_pengirim: kodeKotaPengirim.kode },
        { kota_penerima: kodeKotaPenerima.kode },
      ],
    });

    if (!kodeKotaPengirim || !kodeKotaPenerima || !ongkirData) {
      res.status(400);
      res.json({
        status: 'error',
        message: 'Data kota belum terdaftar di sistem.',
      });
      return;
    }

    const idPesanan = nanoid();
    const resi = `${kodeKotaPengirim.kode}-${kodeKotaPenerima.kode}-${idPesanan}`.toUpperCase();
    const ongkir = parseInt(ongkirData.ongkir, 10)
      * Math.round(parseInt(barang.berat, 10) / PER_KILO);
    const newPesanan = {
      id: idPesanan,
      idAdmin: idJwt,
      resi,
      namaBarang: barang.nama,
      namaPengirim: pengirim.nama,
      namaPenerima: penerima.nama,
      alamatPengirim: pengirim.alamat,
      alamatPenerima: penerima.noHp,
      noHpPengirim: pengirim.noHp,
      noHpPenerima: penerima.noHp,
      berat: barang.berat,
      ongkir,
      status: 'Diproses',
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()'),
    };

    await PesananModel.create({ ...newPesanan });

    res.status(201);
    res.json({
      status: 'success',
      data: {
        resi,
        ongkir,
        status: 'Diproses',
        barang,
        pengirim,
        penerima,
      },
    });
  },
  // Get All
  getAllPesanan: async (req, res) => {
    const { role: roleJwt } = req.jwt.decoded;

    if (roleJwt === 'kurir') {
      res.status(403);
      res.json({
        status: 'error',
        message: 'Anda tidak memiliki hak akses.',
      });
      return;
    }

    const pesanan = await PesananModel.findAll();

    const mappedPesanan = pesanan.map((item) => ({
      resi: item.resi,
      status: item.status,
      barang: {
        nama: item.namaBarang,
        berat: item.berat,
        ongkir: item.ongkir,
      },
      pengirim: {
        nama: item.namaPengirim,
        alamat: item.alamatPengirim,
        noHp: item.noHpPengirim,
      },
      penerima: {
        nama: item.namaPenerima,
        alamat: item.alamatPenerima,
        noHp: item.noHpPenerima,
      },
    }));

    res.json({
      status: 'success',
      data: mappedPesanan,
    });
  },
  // Get By resi
  getPesananByResi: async (req, res) => {
    const { role: roleJwt } = req.jwt.decoded;

    if (roleJwt === 'kurir') {
      res.status(403);
      res.json({
        status: 'error',
        message: 'Anda tidak memiliki hak akses.',
      });
      return;
    }

    const { resi } = req.params;

    if (!resi) {
      res.status(400);
      res.json({
        status: 'error',
        message: 'Data tidak lengkap.',
      });
      return;
    }

    const pesanan = await PesananModel.findOne({
      where: {
        resi,
      },
    });

    if (!pesanan) {
      res.status(404);
      res.json({
        status: 'error',
        message: 'Pesanan tidak ditemukan.',
      });
      return;
    }

    const mappedPesanan = {
      resi: pesanan.resi,
      status: pesanan.status,
      barang: {
        nama: pesanan.namaBarang,
        berat: pesanan.berat,
        ongkir: pesanan.ongkir,
      },
      pengirim: {
        nama: pesanan.namaPengirim,
        alamat: pesanan.alamatPengirim,
        noHp: pesanan.noHpPengirim,
      },
      penerima: {
        nama: pesanan.namaPenerima,
        alamat: pesanan.alamatPenerima,
        noHp: pesanan.noHpPenerima,
      },
    };

    res.status(200);
    res.json({
      status: 'success',
      data: mappedPesanan,
    });
  },
  // Update By resi
  updatePesananByResi: async (req, res) => {
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
    const {
      namaGudang, barang, pengirim, penerima,
    } = req.body;

    if (!resi) {
      res.status(400);
      res.json({
        status: 'error',
        message: 'Data tidak lengkap.',
      });
      return;
    }

    if (!namaGudang || !barang || !pengirim || !penerima) {
      res.status(400);
      res.json({
        status: 'error',
        message: 'Data tidak lengkap.',
      });
      return;
    }

    const pesanan = await PesananModel.findOne({
      where: {
        resi,
      },
    });

    if (!pesanan) {
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
      if (roleJwt !== 'super') {
        res.status(403);
        res.json({
          status: 'error',
          message: 'Anda tidak berhak mengakses gudang ini.',
        });
        return;
      }
    }

    const kodeKota = await KodeKotaModel.findAll({
      where: {
        [Op.or]: [
          { nama: pengirim.kota.toUpperCase() },
          { nama: penerima.kota.toUpperCase() },
        ],
      },
    });

    const kodeKotaPengirim = kodeKota.find(
      (item) => item.nama === pengirim.kota.toUpperCase(),
    );
    const kodeKotaPenerima = kodeKota.find(
      (item) => item.nama === penerima.kota.toUpperCase(),
    );

    const ongkirData = await OngkirModel.findOne({
      where: [
        { kota_pengirim: kodeKotaPengirim.kode },
        { kota_penerima: kodeKotaPenerima.kode },
      ],
    });

    if (!kodeKotaPengirim || !kodeKotaPenerima || !ongkirData) {
      res.status(400);
      res.json({
        status: 'error',
        message: 'Data kota belum terdaftar di sistem.',
      });
      return;
    }

    const idPesanan = resi.split('-')[2];
    const newResi = `${kodeKotaPengirim.kode}-${kodeKotaPenerima.kode}-${idPesanan}`.toUpperCase();
    const ongkir = parseInt(ongkirData.ongkir, 10)
      * Math.round(parseInt(barang.berat, 10) / PER_KILO);
    const newPesanan = {
      id: idPesanan,
      idAdmin: idJwt,
      resi: newResi,
      namaBarang: barang.nama,
      namaPengirim: pengirim.nama,
      namaPenerima: penerima.nama,
      alamatPengirim: pengirim.alamat,
      alamatPenerima: penerima.noHp,
      noHpPengirim: pengirim.noHp,
      noHpPenerima: penerima.noHp,
      berat: barang.berat,
      ongkir,
      status: 'Diproses',
      updatedAt: Sequelize.literal('NOW()'),
    };

    const updatedPesananRow = await PesananModel.update(
      {
        ...newPesanan,
      },
      {
        where: {
          resi,
        },
      },
    );

    if (updatedPesananRow[0] === 0) {
      res.status(404);
      res.json({
        status: 'error',
        message: 'Gagal merubah data pesanan. Pesanan tidak ditemukan.',
      });
      return;
    }

    res.json({
      status: 'success',
      message: 'Berhasil merubah data pesanan.',
    });
  },
  // Delete By resi
  deletePesananByResi: async (req, res) => {
    const { role: roleJwt } = req.jwt.decoded;

    if (roleJwt === 'kurir') {
      res.status(403);
      res.json({
        status: 'error',
        message: 'Anda tidak memiliki hak akses.',
      });
      return;
    }

    const { resi } = req.params;

    if (!resi) {
      res.status(400);
      res.json({
        status: 'error',
        message: 'Data tidak lengkap.',
      });
      return;
    }

    const pesanan = await PesananModel.findOne({
      where: {
        resi,
      },
    });

    if (!pesanan) {
      res.status(404);
      res.json({
        status: 'error',
        message: 'Pesanan tidak ditemukan.',
      });
      return;
    }

    const deletedPesananRow = await PesananModel.destroy({
      where: {
        resi,
      },
    });

    if (deletedPesananRow[0] === 0) {
      res.status(404);
      res.json({
        status: 'error',
        message: 'Gagal menghapus pesanan. Pesanan tidak ditemukan.',
      });
      return;
    }

    res.json({
      status: 'success',
      message: 'Berhasil menghapus pesanan.',
    });
  },
};
