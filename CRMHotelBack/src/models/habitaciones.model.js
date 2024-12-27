const { DataTypes, HasMany } = require('sequelize');
const sequelize = require('../config/db');

const ReservaHabitacion = require('./habitres.model');
const Imagenes = require('./imagenes.model');


const Habitacion = sequelize.define(
    "habitaciones",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        piso: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        puerta: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: true,
        },
        mascotas: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        num_camas: {
            type: DataTypes.STRING(45),
            allownull: false,
        },

        categoria: {
            type: DataTypes.STRING(45),
            allownull: false,
        },
        precio: {
            type: DataTypes.INTEGER,
            allownull: false,
        },
        tamanho: {
            type: DataTypes.STRING(45),
            allownull: true,
        },
        vista: {
            type: DataTypes.STRING(45),
            allownull: false,
        },
        cocina: {
            type: DataTypes.STRING(45),
            allownull: false,
        },
    },
    {
        sequelize,
        tableName: "habitaciones",
        timestamps: false,
    }
);

ReservaHabitacion.belongsTo(Habitacion, { as: 'habitaciones', foreignKey: 'habitaciones_id' });
Habitacion.hasMany(ReservaHabitacion, { as: 'reserva_habitaciones', foreignKey: 'habitaciones_id' });

Habitacion.hasMany(Imagenes, { as: 'imagenes', foreignKey: 'habitaciones_id' });

module.exports = Habitacion;
