const ProfilDesa = require('../models/ProfilDesa');

exports.get = async (req, res) => {
  try {
    const profil = await ProfilDesa.findOne({ where: { id: 1 } });
    if (!profil) {
      return res.status(404).json({ error: 'Data profil desa tidak ditemukan' });
    }
    res.json(profil);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal mengambil data profil desa' });
  }
};

exports.update = async (req, res) => {
  try {
    const { nama_desa, sejarah, luas_wilayah, jumlah_penduduk, visi, misi } = req.body;
    const updated = await ProfilDesa.update(
      { nama_desa, sejarah, luas_wilayah, jumlah_penduduk, visi, misi },
      { where: { id: 1 } }
    );
    res.json({ message: 'Profil desa berhasil diperbarui' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
