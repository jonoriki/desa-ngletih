// src/models/ProfilDesa.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ProfilDesa = sequelize.define('profil_desa', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nama_desa: DataTypes.TEXT,
  sejarah: DataTypes.TEXT,
  luas_wilayah: DataTypes.TEXT,
  jumlah_penduduk: DataTypes.TEXT,
  visi: DataTypes.TEXT,
  misi: DataTypes.TEXT
}, {
  tableName: 'profil_desa',
  timestamps: false
});

module.exports = ProfilDesa;
