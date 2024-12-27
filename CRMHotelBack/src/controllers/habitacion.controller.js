const sequelize = require('../config/db');
const { QueryTypes } = require('sequelize');

// Traer el modelo creado
const Habitacion = require("../models/habitaciones.model");
const ReservaHabitacion = require("../models/habitres.model");
const Imagenes = require("../models/imagenes.model");
const { Reserva } = require("../models/reservas.model");
const fs = require("fs");

const getAll = async (req, res, next) => {
  try {
    const habitaciones = await Habitacion.findAll(
      { include: ["imagenes"] }
    );
    res.json(habitaciones);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  const { roomId } = req.params;
  try {
    const habitacion = await Habitacion.findByPk(roomId, {
      include: ["imagenes", "reserva_habitaciones"],
    });
    for (reserva of habitacion.reserva_habitaciones) {
      console.log(reserva.reservas_id);
      const reservaHab = await Reserva.findByPk(reserva.reservas_id);
      console.log(reservaHab);
      reserva.dataValues = reservaHab;
    }

    console.log(habitacion);
    res.json(habitacion);
  } catch (error) {
    next(error);
  }
};



const createImagen = async (req, res, next) => {
  const { roomId } = req.params;
  try {
    // - Renombrar la imagen -> REPO
    // - Guardar la ruta de la imagen en la BD
    // Antes de guardar el producto en la base de datos, modificamos la imagen para situarla donde nos interesa
    const extension = '.' + req.file.mimetype.split('/')[1];

    // Obtengo el nombre de la nueva imagen
    const newName = req.file.filename + extension;

    // Obtengo la ruta donde estará, adjuntándole la extensión
    const newPath = req.file.path + extension;
    console.log(newPath)
    // Muevo la imagen para que reciba la extensión
    fs.renameSync(req.file.path, newPath);

    const imagenCreada = await Imagenes.create({
      habitaciones_id: roomId,
      ruta: (`images/${newName}`)
    });

    res.json(imagenCreada)
  } catch (error) {
    next(error)
  }
}
const deleteImagen = async (req, res, next) => {
  const { imagenId } = req.params;
  try {
    const imagen = await Imagenes.findByPk(imagenId);
    await imagen.destroy();
    res.json(imagen);
  } catch (error) {
    next(error);
  }
}

const getHabByPiso = async (req, res, next) => {
  const { piso } = req.params;
  try {
    const habitaciones = await Habitacion.findAll({
      where: {
        piso: piso,
      },
      include: ["reserva_habitaciones"],
    });
    res.json(habitaciones);
  } catch (error) {
    next(error);
  }
};

const getHabByCategoria = async (req, res, next) => {
  const { categoria } = req.params;
  try {
    const habitaciones = await Habitacion.findAll({
      where: {
        categoria: categoria,
      },
    });
    res.json(habitaciones);
  } catch (error) {
    next(error);
  }
};

const getHabByVista = async (req, res, next) => {
  try {
    const habitaciones = await Habitacion.findAll({
      where: {
        vista: req.params.vista,
      },
    });
    res.json(habitaciones);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const habitacion = await Habitacion.create(req.body);
    res.json(habitacion);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const { roomId } = req.params;
  try {
    const habitacion = await Habitacion.findByPk(roomId);
    await habitacion.update(req.body);
    res.json(habitacion);
  } catch (error) {
    next(error);
  }
};

//Delete

const destroy = async (req, res, next) => {
  const { roomId } = req.params;
  try {
    const habitacion = await Habitacion.findByPk(roomId);
    await habitacion.destroy();
    res.json(habitacion);
  } catch (error) {
    next(error);
  }
};

const getHabByFecha = async (req, res, next) => {
  try {
    const { fecha_entrada, fecha_salida } = req.params;
    const habitaciones = await sequelize.query('SELECT * FROM habitaciones h WHERE id NOT IN( SELECT h.id FROM habitaciones h INNER JOIN reserva_habitaciones rh ON h.id = rh.habitaciones_id INNER JOIN reservas r  ON  rh.reservas_id = r.id WHERE fecha_entrada BETWEEN  ? AND  ?)', {
      replacements: [fecha_entrada, fecha_salida],
      type: QueryTypes.SELECT,
    });
    res.json(habitaciones);
  } catch (error) {
    next(error);
  }
}


module.exports = {
  getAll,
  getById,
  getHabByPiso,
  getHabByCategoria,
  getHabByVista,
  create,
  createImagen,
  deleteImagen,
  update,
  destroy,
  getHabByFecha
};
