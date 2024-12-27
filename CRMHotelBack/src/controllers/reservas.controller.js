const Habitacion = require('../models/habitaciones.model')
const { Reserva } = require('../models/reservas.model')
const Usuario = require('../models/usuarios.model')
const { Op } = require('sequelize')
const dayjs = require('dayjs');
const sequelize = require('../config/db');
const { QueryTypes } = require('sequelize');

const getReservas = async (req, res, next) => {
    try {
        const reservas = await Reserva.findAll({
            include: ['usuario']
        });

        res.json(reservas)

    } catch (error) {
        next(error)
    }
}

const getReservaById = async (req, res, next) => {
    const { reservaId } = req.params
    try {
        const reserva = await Reserva.findByPk(reservaId)
        if (!reserva) {
            return res.status(404).json({ message: 'La reserva no existe' })
        }
        res.json(reserva)
    } catch (error) {
        next(error)
    }
}

const updateReserva = async (req, res, next) => {
    const { reservaId } = req.params
    try {
        const reserva = await Reserva.findByPk(reservaId)
        reserva.update(req.body)
        res.json(reserva)
    } catch (error) {
        next(error)
    }
}

const createReserva = async (req, res, next) => {
    try {
        // Agregar el usuarios_id con el usuario logado
        req.body.usuarios_id = req.user.id;
        // Agregar el estado de la reserva
        req.body.estado = 'Confirmada';
        // Recuperar la información de la habitación a partir de habitacion_id
        const habitacion = await Habitacion.findByPk(req.body.habitacion_id);
        // Calcular el número de noches
        const fecha_entrada = dayjs(req.body.fecha_entrada);
        const fecha_salida = dayjs(req.body.fecha_salida);
        const noches = fecha_salida.diff(fecha_entrada, 'day');
        // Calcular el precio total de la reserva
        req.body.precio = noches * habitacion.precio;

        const reserva = await Reserva.create(req.body)
        res.json(reserva)
    } catch (error) {
        console.log(error);
        next(error)
    }
}

const filterByCliente = async (req, res, next) => {
    try {
        const { clienteId } = req.params
        const reserva = await Reserva.findAll({
            where: {
                clienteId
            }
        })
        res.json(reserva)
    } catch (error) {
        next(error)
    }
}

const filterByFecha = async (req, res, next) => {
    try {
        const { fecha_entrada } = req.params
        const reserva = await Reserva.findAll({
            where: {
                fecha_entrada
            }
        })
        res.json(reserva)
    } catch (error) {
        next(error)
    }
}


const filterByFechaEntradaySalida = async (req, res, next) => {
    try {
        const { fecha_entrada, fecha_salida } = req.params
        const reserva = await Reserva.findAll({
            where: {
                fecha_entrada: {
                    [Op.gte]: fecha_entrada
                },
                fecha_salida: {
                    [Op.lte]: fecha_salida
                }
            }
        })
        res.json(reserva)
    } catch (error) {
        next(error)
    }
}

const filterByDni = async (req, res, next) => {
    try {

        const { usuarioDni } = req.params;
        const reservas = await Reserva.findAll({
            include: [
                {
                    model: Usuario, //union con el modelo de usuario
                    as: 'usuario', // alias usado en la union del model
                    where:
                        { dni: usuarioDni }, // comparamos el campo de la tabla usuarios con lo que le pasamos por params

                    attributes: [],
                },
            ],
        });

        res.json(reservas);
    } catch (error) {
        next(error);
    }
};

const cancelarReserva = async (req, res, next) => {
    try {
        const { reservaId } = req.params;
        const reserva = await Reserva.findByPk(reservaId);
        reserva.estado = 'Cancelada';
        await reserva.save();
        res.json(reserva);

    } catch (error) {
        next(error);
    }
}

const getReservasUsuario = async (req, res, next) => {
    try {

        const reservas = await sequelize.query("SELECT * FROM reservas r WHERE r.usuarios_id = ? AND estado = 'Confirmada';", {
            replacements: [req.user.id],
            type: QueryTypes.SELECT,
        });
        res.json(reservas);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    getReservas,
    getReservaById,
    updateReserva,
    createReserva,
    filterByCliente,
    filterByFecha,
    filterByFechaEntradaySalida,
    filterByDni,
    cancelarReserva,
    getReservasUsuario
}