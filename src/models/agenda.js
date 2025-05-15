const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Agenda = sequelize.define('Agenda', {
  judul: { type: DataTypes.STRING, allowNull: false },
  tanggal: { type: DataTypes.DATEONLY, allowNull: false },
  lokasi: { type: DataTypes.STRING, allowNull: false },
  deskripsi: { type: DataTypes.TEXT }
}, {
  tableName: 'agenda',
  timestamps: false
});

module.exports = Agenda;
