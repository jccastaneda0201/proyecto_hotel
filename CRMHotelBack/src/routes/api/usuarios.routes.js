const { registro, login, getUsuarioByDni, getUserSinId, updateUser } = require('../../controllers/usuarios.controller');
const { checkBodyUsuario, checkToken } = require('../../middlewares/usuarios.middlewares');

const router = require('express').Router();

router.post('/registro', checkBodyUsuario, registro);
router.post('/login', login)
router.get('/logeado', checkToken, getUserSinId);
router.get('/:usDni', getUsuarioByDni);

router.put('/edit', checkToken, updateUser);
module.exports = router

