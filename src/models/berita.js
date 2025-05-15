const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Berita = sequelize.define('Berita', {
  judul: DataTypes.STRING,
  konten: DataTypes.TEXT,
  tanggal_publikasi: DataTypes.DATE,
  penulis: DataTypes.STRING,
  kategori: DataTypes.STRING,
  url_gambar: DataTypes.STRING,
  status: DataTypes.STRING,
}, {
  tableName: 'berita',
  timestamps: false,
});

module.exports = Berita;
