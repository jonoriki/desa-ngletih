const express = require('express');
const router = express.Router();
const controller = require('../controllers/agendaController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', controller.getAll); // publik
router.post('/', verifyToken, controller.create);
router.put('/:id', verifyToken, controller.update);
router.delete('/:id', verifyToken, controller.remove);

module.exports = router;
