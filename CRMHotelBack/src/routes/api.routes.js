const router = require('express').Router();

router.use('/usuarios', require('./api/usuarios.routes'));
router.use('/reservas', require('./api/reservas.routes'));
router.use('/habitaciones', require('./api/habitaciones.routes'));

module.exports = router;