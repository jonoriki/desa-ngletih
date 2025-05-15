const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Aparatur = sequelize.define('Aparatur', {
  nama: {
    type: DataTypes.STRING,
    allowNull: false
  },
  jabatan: {
    type: DataTypes.STRING,
    allowNull: false
  },
  urutan: {
    type: DataTypes.INTEGER,
    defaultValue: 99
  }
}, {
  tableName: 'aparatur',
  timestamps: false
});

module.exports = Aparatur;
