const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const verifyToken = require('../middlewares/verifyToken');

router.post('/login', adminController.login);
router.get('/stats', verifyToken, adminController.stats); // kalau stats sudah ditambahkan

// src/routes/adminRoutes.js
router.get('/list', verifyToken, adminController.getAllAdmins);

router.put('/password', verifyToken, adminController.changePassword);

router.post('/tambah', verifyToken, adminController.addAdmin);
router.delete('/:id', verifyToken, adminController.deleteAdmin);

module.exports = router;
