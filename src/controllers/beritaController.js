// === backend/controllers/beritaController.js ===
const Berita = require('../models/berita');
const beritaModel = require('../models/beritaModel');
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');

exports.getAll = async (req, res) => {
  const search = req.query.search || '';
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;

  const includeDraft = req.query.includeDraft === 'true'; // 💡 deteksi dari query

  try {
    const result = await beritaModel.getAllWithPagination(search, page, limit, includeDraft);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const berita = await Berita.findByPk(req.params.id);
    if (!berita) return res.status(404).json({ error: 'Berita tidak ditemukan' });
    res.json(berita);
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil berita' });
  }
};

exports.create = async (req, res) => {
  try {
    const { judul, konten, tanggal_publikasi, penulis, kategori, status } = req.body;

    if (!judul || !konten || !tanggal_publikasi || isNaN(Date.parse(tanggal_publikasi))) {
      return res.status(400).json({ error: 'Judul, konten, dan tanggal wajib diisi dan valid' });
    }

    let url_gambar = null;
    if (req.file) {
      url_gambar = `/uploads/${req.file.filename}`;
    }

    const berita = await Berita.create({
      judul, konten, tanggal_publikasi, penulis, kategori, status, url_gambar,
    });

    res.status(201).json(berita);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const berita = await Berita.findByPk(id);
    if (!berita) return res.status(404).json({ error: 'Data tidak ditemukan' });

    const { judul, konten, tanggal_publikasi, penulis, kategori, status } = req.body;

    let url_gambar = berita.url_gambar;
    if (req.file) {
      if (berita.url_gambar) {
        const oldPath = path.join(__dirname, '..', '..', berita.url_gambar);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      url_gambar = `/uploads/${req.file.filename}`;
    }

    await Berita.update(
      { judul, konten, tanggal_publikasi, penulis, kategori, status, url_gambar },
      { where: { id } }
    );

    res.json({ message: 'Berita berhasil diperbarui' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const berita = await Berita.findByPk(id);
    if (!berita) return res.status(404).json({ error: 'Data tidak ditemukan' });

    if (berita.url_gambar) {
      const oldPath = path.join(__dirname, '..', '..', berita.url_gambar);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    await Berita.destroy({ where: { id } });
    res.json({ message: 'Berita berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.search = async (req, res) => {
  try {
    const keyword = req.query.keyword || '';
    const likeQuery = { [Op.iLike]: `%${keyword}%` };

    const results = await Berita.findAll({
      where: {
        [Op.or]: [
          { judul: likeQuery },
          { konten: likeQuery },
          { penulis: likeQuery },
          { kategori: likeQuery },
        ],
      },
      limit: 10,
      order: [['id', 'DESC']],
    });

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil berita' });
  }
};

