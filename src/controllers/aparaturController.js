const Aparatur = require('../models/aparatur');

exports.getAll = async (req, res) => {
  try {
    const data = await Aparatur.findAll({ order: [['urutan', 'ASC']] });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil data aparatur' });
  }
};

exports.create = async (req, res) => {
  try {
    const { nama, jabatan, urutan } = req.body;
    const baru = await Aparatur.create({ nama, jabatan, urutan });
    res.status(201).json(baru);
  } catch (err) {
    res.status(500).json({ error: 'Gagal menambah aparatur' });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, jabatan, urutan } = req.body;
    const updated = await Aparatur.update({ nama, jabatan, urutan }, { where: { id } });
    res.json({ message: 'Aparatur diperbarui' });
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengupdate aparatur' });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    await Aparatur.destroy({ where: { id } });
    res.json({ message: 'Aparatur dihapus' });
  } catch (err) {
    res.status(500).json({ error: 'Gagal menghapus aparatur' });
  }
};
