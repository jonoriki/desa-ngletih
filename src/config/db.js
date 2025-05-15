// === src/config/db.js ===
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  prepareStatements: false, // ❗ WAJIB nonaktif untuk pooler
  logging: false,
});

module.exports = sequelize;
