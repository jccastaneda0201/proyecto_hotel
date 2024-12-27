const bcrypt = require('bcrypt');
const Usuario = require('../models/usuarios.model');
const createToken = require('../../utils/helpers');
const { Reserva } = require('../models/reservas.model');
const sequelize = require('../config/db.js');


const registro = async (req, res, next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const usuario = await Usuario.create(req.body);
        res.json(usuario);
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const usuario = await Usuario.findOne({ where: { email: email } });
        console.log(usuario)
        if (!usuario) {
            res.status(403).json({ message: "Error en el email y/o en la contraseña" })
        }
        const passwordsIguales = await bcrypt.compare(password, usuario.password);
        if (!passwordsIguales) {
            res.status(403).json({ message: "Error en el email y/o en la contraseña" })
        }
        res.json({ message: "¡Login correcto", token: createToken(usuario) })
    } catch (error) {
        next(error)
    }
}

const getUsuarioByDni = async (req, res, next) => {
    const { usDni } = req.params
    try {
        const usuario = await Usuario.findOne({
            where: { dni: usDni },
            include: ['reservas']
        });
        res.json(usuario);

    } catch (error) {

    }
}

const getUsuarioById = async (req, res, next) => {
    const { userId } = req.params
    try {
        const usuario = await Usuario.findByPk(userId);
        res.json(usuario);
    } catch (error) {
        next(error)
    }
}
const getUserSinId = async (req, res, next) => {
    try {
        console.log(req.user)
        const usuario = await sequelize.query('SELECT * FROM usuarios u WHERE u.id = ?', { replacements: [req.user.id], type: sequelize.QueryTypes.SELECT });
        res.json(usuario[0]);
    } catch (error) {
        next(error)

    }
}

// Update user given req.user.id as the user id
const updateUser = async (req, res, next) => {
    try {
        const usuario = await Usuario.findByPk(req.user.id);
        await usuario.update(req.body);
        res.json(usuario);
    } catch (error) {
        next(error)
    }
}


module.exports = {
    registro, login, getUsuarioByDni, getUsuarioById, getUserSinId, updateUser
}
