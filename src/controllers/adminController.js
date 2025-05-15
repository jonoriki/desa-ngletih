const Berita = require('../models/berita');
const { Op } = require('sequelize');
const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.stats = async (req, res) => {
  try {
    const total = await Berita.count();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const beritaHariIni = await Berita.count({
      where: {
        tanggal_publikasi: {
          [Op.gte]: today,
        },
      },
    });

    const kategoriUnik = await Berita.aggregate('kategori', 'DISTINCT', { plain: false });
    const penulisUnik = await Berita.aggregate('penulis', 'DISTINCT', { plain: false });

    res.json({
      total,
      beritaHariIni,
      jumlahKategori: kategoriUnik.length,
      jumlahPenulis: penulisUnik.length,
    });
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil statistik' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username dan password wajib diisi' });
  }

  try {
    const admin = await Admin.findOne({ where: { username } });
    if (!admin) {
      return res.status(401).json({ error: 'Username tidak ditemukan' });
    }

    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(401).json({ error: 'Password salah' });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Gagal login admin' });
  }
};

exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll({
      attributes: ['id', 'username'], // Jangan kirim password!
      order: [['id', 'ASC']],
    });
    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil data admin' });
  }
};

// ✅ Ubah password admin
exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const adminId = req.admin.id;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Password lama dan baru wajib diisi' });
  }

  try {
    const admin = await Admin.findByPk(adminId);
    if (!admin) {
      return res.status(404).json({ error: 'Admin tidak ditemukan' });
    }

    const match = await bcrypt.compare(currentPassword, admin.password);
    if (!match) {
      return res.status(401).json({ error: 'Password lama salah' });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    admin.password = hashed;
    await admin.save();

    res.json({ message: 'Password berhasil diubah' });
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengubah password' });
  }
};

// ✅ Tambah admin baru
exports.addAdmin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username dan password wajib diisi' });
  }

  try {
    const existing = await Admin.findOne({ where: { username } });
    if (existing) {
      return res.status(409).json({ error: 'Username sudah digunakan' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create({ username, password: hashed });
    res.status(201).json({ message: 'Admin berhasil ditambahkan', admin: { id: newAdmin.id, username: newAdmin.username } });
  } catch (err) {
    res.status(500).json({ error: 'Gagal menambah admin' });
  }
};

// ✅ Hapus admin
exports.deleteAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await Admin.findByPk(id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin tidak ditemukan' });
    }

    // Opsional: jangan izinkan hapus dirinya sendiri
    if (req.admin.id === admin.id) {
      return res.status(400).json({ error: 'Tidak bisa menghapus akun sendiri' });
    }

    await admin.destroy();
    res.json({ message: 'Admin berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ error: 'Gagal menghapus admin' });
  }
};

