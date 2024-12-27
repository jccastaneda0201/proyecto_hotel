const jwt = require('jsonwebtoken');
const Reserva = require('../models/reservas.model');

const checkResId = async (req, res, next) => {
    const { reservaId } = req.params;
    if (isNaN(reservaId)) {
        return res.status(400).send('el reservaId tiene que ser un num');
    }
    const reserva = await Reserva.findByPk(reservaId);
    if (!reserva) {
        return res.status(400).json({ message: 'El id de la reserva no existe ' });
    }

    next()
}

const checkBodyReserva = async (req, res, next) => {
    const { fecha_entrada, fecha_salida, num_personas, tipo_cancelacion, precio, regimen, metodo_pago } = req.body;
    if (!fecha_entrada || !fecha_salida || !num_personas || !precio || !tipo_cancelacion || !regimen || !metodo_pago) {
        return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }
    next()
}

const checkFechasReserva = (req, res, next) => {
    const { fecha_entrada, fecha_salida } = req.body;
    if (new Date(fecha_entrada) >= new Date(fecha_salida)) {
        return res.status(400).json({ message: 'La fecha de entrada no puede ser posterior o igual a la fecha de salida' });
    }
    next();
}

module.exports = {
    checkResId, checkBodyReserva, checkFechasReserva
}