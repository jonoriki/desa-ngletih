// routes/profilDesaRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/profilDesaController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', controller.get); // publik
router.put('/', verifyToken, controller.update); // hanya admin

module.exports = router;
