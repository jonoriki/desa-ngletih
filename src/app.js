const express = require('express');
const cors = require('cors');
const path = require('path');
const beritaRoutes = require('./routes/beritaRoutes');
const adminRoutes = require('./routes/adminRoutes');
const aparaturRoutes = require('./routes/aparaturRoutes');
const agendaRoutes = require('./routes/agendaRoutes');

const app = express();
const profilDesaRoutes = require('./routes/profilDesaRoutes');

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/berita', beritaRoutes);

app.use('/api/admin', adminRoutes);

app.use('/api/aparatur', aparaturRoutes);

app.use('/api/agenda', agendaRoutes);

app.use('/api/profil', profilDesaRoutes);

app.get('/api/hello', (req, res) => {
  res.json({ msg: 'Server OK from Render 🎉' });
});


module.exports = app; // ✅ Kembalikan app, BUKAN jalankan
