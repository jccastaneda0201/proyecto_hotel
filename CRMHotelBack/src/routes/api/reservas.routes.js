const { checkFechasReserva } = require('../../middlewares/reservas.middleware');
const { checkUsuarioId, checkToken, checkAdmin } = require('../../middlewares/usuarios.middlewares');
const { getReservas, getReservaById, createReserva, updateReserva, filterByCliente, filterByFecha, filterByFechaEntradaySalida, filterByDni, cancelarReserva, getReservasUsuario } = require('../../controllers/reservas.controller');


const router = require('express').Router();



router.get('/', getReservas)
router.get('/usuarios/:usuarioId', checkUsuarioId, filterByCliente)
router.get('/misreservas', checkToken, getReservasUsuario)
router.get('/fecha/:fecha_entrada', checkFechasReserva, filterByFecha)
router.get('/:reservaId', checkToken, getReservaById)
router.get('/fecha/:fecha_entrada/:fecha_salida', filterByFechaEntradaySalida)
router.get('/dni/:usuarioDni', filterByDni)
router.post('/', createReserva)
router.put('/edit/:reservaId', updateReserva)
router.post('/', checkToken, createReserva)
router.put('/:reservaId', checkToken, checkAdmin, updateReserva)
router.put('/cancelar/:reservaId', checkToken, cancelarReserva)


module.exports = router

