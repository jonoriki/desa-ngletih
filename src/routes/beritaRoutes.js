const express = require('express');
const beritaController = require('../controllers/beritaController');
const validateSearch = require('../middlewares/validateSearch');
const verifyToken = require('../middlewares/verifyToken');
const upload = require('../middlewares/uploadBerita'); // ✅ GANTI INI

const router = express.Router();

// Rute publik
router.get('/search', validateSearch, beritaController.search);
router.get('/', beritaController.getAll);
router.get('/:id', beritaController.getById);

// Rute admin (dengan proteksi token)
router.post('/', verifyToken, upload.single('gambar'), beritaController.create);
router.put('/:id', verifyToken, upload.single('gambar'), beritaController.update);
router.delete('/:id', verifyToken, beritaController.remove);

module.exports = router;
