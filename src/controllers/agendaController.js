const Agenda = require('../models/agenda');

exports.getAll = async (req, res) => {
  try {
    const data = await Agenda.findAll({ order: [['tanggal', 'DESC']] });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil agenda' });
  }
};

exports.create = async (req, res) => {
  try {
    const { judul, tanggal, lokasi, deskripsi } = req.body;
    const newAgenda = await Agenda.create({ judul, tanggal, lokasi, deskripsi });
    res.status(201).json(newAgenda);
  } catch {
    res.status(500).json({ error: 'Gagal menambahkan agenda' });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { judul, tanggal, lokasi, deskripsi } = req.body;
    await Agenda.update({ judul, tanggal, lokasi, deskripsi }, { where: { id } });
    res.json({ message: 'Agenda diperbarui' });
  } catch {
    res.status(500).json({ error: 'Gagal memperbarui agenda' });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    await Agenda.destroy({ where: { id } });
    res.json({ message: 'Agenda dihapus' });
  } catch {
    res.status(500).json({ error: 'Gagal menghapus agenda' });
  }
};
