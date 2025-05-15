require('dotenv').config();
const app = require('./src/app');
const sequelize = require('./src/config/db');
const Admin = require('./src/models/admin'); // ✅ BENAR

const bcrypt = require('bcrypt');


const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    // Cek apakah admin default sudah ada
    const existing = await Admin.findOne({ where: { username: 'admin' } });
    if (!existing) {
      await Admin.create({
        username: 'admin',
        password: await bcrypt.hash('admin123', 10),
      });
      console.log('✅ Admin default berhasil ditambahkan');
    }

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Database connection error:', error);
  }
})();
