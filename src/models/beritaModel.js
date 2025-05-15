const { Op } = require('sequelize');
const Berita = require('./berita');

// includeDraft: true => tampilkan semua status
exports.getAllWithPagination = async (search = '', page = 1, limit = 6, includeDraft = false) => {
  const offset = (page - 1) * limit;

  const whereClause = {
    ...(search.trim() && {
      [Op.or]: [
        { judul: { [Op.iLike]: `%${search}%` } },
        { konten: { [Op.iLike]: `%${search}%` } },
        { penulis: { [Op.iLike]: `%${search}%` } },
        { kategori: { [Op.iLike]: `%${search}%` } },
      ]
    }),
    ...(!includeDraft && { status: 'terbit' }), // 🔒 hanya tampilkan berita "terbit" jika bukan admin
  };

  const { rows: data, count: total } = await Berita.findAndCountAll({
    where: whereClause,
    limit,
    offset,
    order: [['tanggal_publikasi', 'DESC']],
  });

  return { data, total, page, totalPages: Math.ceil(total / limit) };
};
