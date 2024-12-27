const jwt = require('jsonwebtoken');
const Habitacion = require('../models/habitaciones.model');

const checkHabId = async (req, res, next) => {
    console.log(req.params);
    const { roomId } = req.params;
    if (isNaN(roomId)) {
        return res.status(400).send('el roomId tiene que ser un num');
    }
    const habitacion = await Habitacion.findByPk(roomId);
    if (!habitacion) {
        return res.status(400).json({ message: 'El id de la habitación no existe ' });
    }

    next()
}


const checkBodyHabitacion = async (req, res, next) => {
    const { piso, puerta, mascotas, num_camas, categoria, precio, ubicacion, cocina } = req.body;
    if (!piso || !puerta || !mascotas || !num_camas || !categoria || !precio || !ubicacion || !cocina) {
        return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }
    next()
}


module.exports = {
    checkHabId, checkBodyHabitacion
}