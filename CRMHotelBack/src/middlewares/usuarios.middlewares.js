const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarios.model');
const dayjs = require('dayjs');

const checkToken = async (req, res, next) => {

    if (!req.headers['authorization']) {
        return res.status(403).json({ message: 'No token provided' });
    }
    const token = req.headers['authorization'];

    let data;
    try {
        data = jwt.verify(token, 'crmhotel');
    } catch (error) { return res.status(403).json({ message: 'Token invalid' }); }

    const usuario = await Usuario.findOne({ where: { id: data.usuario_id } });
    if (!usuario) {
        return res.status(403).json({ message: 'No user found' });
    }

    req.user = usuario;

    next();
}

const checkAdmin = async (req, res, next) => {

    if (req.user.rol !== 'admin') {
        return res.status(403).json({ message: 'No admin user' });
    } next();
}
const checkUsuarioId = async (req, res, next) => {
    const { usuarioId } = req.params;
    if (isNaN(usuarioId)) {
        return res.status(400).send('el usuarioId tiene que ser un num');
    }
    const usuario = await Usuario.findByPk(usuarioId);
    if (!usuario) {
        return res.status(400).json({ message: 'El id del usuario no existe ' });
    }

    next()
}

const checkBodyUsuario = async (req, res, next) => {
    const { nombre, apellidos, fecha_nacimiento, email, dni, password, rol, telefono, pais, ciudad, cod_postal } = req.body;
    if (!nombre || !apellidos || !fecha_nacimiento || !email || !dni || !password || !telefono || !pais || !ciudad || !cod_postal) {
        return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }
    //OBJETIVO: El email debe tener formato correcto (RegExpr)

    const emailExpresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailExpresionRegular.test(email)) {
        return res.status(400).json({ message: 'El email no es válido' });
    }


    //OBJETIVO: El DNI debe tener formato correcto

    /*   const dniExpresionRegular = /^\d{9}[A-Za-z]$/;
  
      if (!dni || !dniExpresionRegular.test(dni)) {
          return res.status(400).json({ message: 'El dni no es válido' });
      }
   */
    if (dayjs().diff(fecha_nacimiento, 'years') <= 18) {
        return res.status(400).json({ message: 'Debes tener como mínimo 18 años' })
    }
    next();
}

module.exports = { checkToken, checkAdmin, checkUsuarioId, checkBodyUsuario }
