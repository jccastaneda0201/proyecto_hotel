const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const Usuario = require('./usuarios.model');
const ReservaHabitacion = require('./habitres.model');

const Reserva = sequelize.define('Reserva', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    fecha_entrada: {
        allowNull: false,
        type: DataTypes.DATE
    },
    fecha_salida: {
        allowNull: false,
        type: DataTypes.DATE
    },
    puntuacion: {
        allowNull: true,
        type: DataTypes.INTEGER
    },
    num_personas: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    regimen: {
        allowNull: false,
        type: DataTypes.STRING(45)
    },
    tipo_cancelacion: {
        allowNull: false,
        type: DataTypes.STRING(45)
    },
    aparcamiento: {
        allowNull: true,
        type: DataTypes.STRING(45)
    },
    desayuno: {
        allowNull: false,
        type: DataTypes.STRING(45)
    },
    spa: {
        allowNull: true,
        type: DataTypes.BOOLEAN
    },
    gimnasio: {
        allowNull: true,
        type: DataTypes.BOOLEAN
    },
    piscina: {
        allowNull: true,
        type: DataTypes.BOOLEAN
    },
    precio: {
        allowNull: false,
        type: DataTypes.STRING(45)
    },
    metodo_pago: {
        allowNull: false,
        type: DataTypes.STRING(45)
    },
    estado: {
        allowNull: false,
        type: DataTypes.STRING(45)
    },
    num_habitaciones: {
        allowNull: true,
        type: DataTypes.INTEGER
    },
    usuarios_id: {
        allowNull: false,
        type: DataTypes.INTEGER
    }
}
    , {
        sequelize, tableName: 'reservas', timestamps: false
    })




Usuario.hasMany(Reserva, { as: 'reservas', foreignKey: 'usuarios_id' });
Reserva.belongsTo(Usuario, { as: 'usuario', foreignKey: 'usuarios_id' });

ReservaHabitacion.belongsTo(Reserva, { as: 'reservas', foreignKey: 'reservas_id' });
Reserva.hasMany(ReservaHabitacion, { as: 'reserva_habitaciones', foreignKey: 'reservas_id' });




module.exports = { Reserva };

